import { promises as fs } from "fs";
import os from "os";
import path from "path";
import {
  galleryItems as seedGallery,
  media as seedMedia,
  messages as seedMessages,
  pages as seedPages,
  posts as seedPosts,
  users as seedUsers,
  type AdminPage,
  type AdminPost,
  type AdminUser,
  type GalleryItem,
  type MediaItem,
  type Message,
  type PostStatus,
} from "./admin-data";

type Store = {
  posts: AdminPost[];
  pages: AdminPage[];
  media: MediaItem[];
  gallery: GalleryItem[];
  messages: Message[];
  users: AdminUser[];
};

const STORE_DIR = process.env.CONTENT_STORE_DIR
  ? path.resolve(process.env.CONTENT_STORE_DIR)
  : process.env.VERCEL
    ? path.join(os.tmpdir(), "fgm-content")
    : path.join(process.cwd(), "data");
const STORE_FILE = path.join(STORE_DIR, "store.json");

const KV_URL = (
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  ""
).replace(/\/$/, "");
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const KV_KEY = "fgm:cms:store";
const kvEnabled = Boolean(KV_URL && KV_TOKEN);

let queue: Promise<unknown> = Promise.resolve();
let memoryStore: Store | null = null;

async function kvCommand(command: (string | number)[]) {
  const response = await fetch(KV_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`KV request failed (${response.status})`);

  const payload = (await response.json()) as { result?: unknown; error?: string };
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}

function normalizeStore(parsed: Partial<Store>, seed: Store): Store {
  return {
    posts: parsed.posts ?? seed.posts,
    pages: parsed.pages ?? seed.pages,
    media: parsed.media ?? seed.media,
    gallery: parsed.gallery ?? seed.gallery,
    messages: parsed.messages ?? seed.messages,
    users: parsed.users ?? seed.users,
  };
}

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

function seedStore(): Store {
  return structuredClone({
    posts: seedPosts,
    pages: seedPages,
    media: seedMedia,
    gallery: seedGallery,
    messages: seedMessages,
    users: seedUsers,
  });
}

async function writeStore(store: Store) {
  memoryStore = store;

  if (kvEnabled) {
    try {
      await kvCommand(["SET", KV_KEY, JSON.stringify(store)]);
      return;
    } catch {
      // Fall through to the local file so the app keeps working.
    }
  }

  try {
    await fs.mkdir(STORE_DIR, { recursive: true });
    const temp = `${STORE_FILE}.${process.pid}.tmp`;
    await fs.writeFile(temp, JSON.stringify(store, null, 2), "utf8");
    await fs.rename(temp, STORE_FILE);
  } catch {
    // Read-only or ephemeral hosts: keep working from process memory.
  }
}

async function readStore(): Promise<Store> {
  if (!kvEnabled && memoryStore) return memoryStore;

  const seed = seedStore();

  if (kvEnabled) {
    try {
      const raw = await kvCommand(["GET", KV_KEY]);
      if (typeof raw === "string" && raw) {
        memoryStore = normalizeStore(JSON.parse(raw) as Partial<Store>, seed);
        return memoryStore;
      }
      memoryStore = seed;
      await writeStore(seed);
      return memoryStore;
    } catch {
      // Fall through to the local file / memory fallback.
    }
  }

  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    memoryStore = normalizeStore(JSON.parse(raw) as Partial<Store>, seed);
  } catch {
    memoryStore = seed;
    await writeStore(seed);
  }

  return memoryStore;
}

function mutate<T>(task: (store: Store) => T | Promise<T>): Promise<T> {
  return enqueue(async () => {
    const store = await readStore();
    const result = await task(store);
    await writeStore(store);
    return result;
  });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

export function nowStamp() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}`;
}

export function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function nextId(items: { id: number }[]) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

/* ------------------------------- Posts ------------------------------- */

export async function getPosts() {
  const store = await readStore();
  return [...store.posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(id: number) {
  const store = await readStore();
  return store.posts.find((post) => post.id === id) ?? null;
}

export type PostInput = {
  title: string;
  content: string;
  excerpt: string;
  status: PostStatus;
  author: string;
  categories: string[];
};

export function createPost(input: PostInput) {
  return mutate((store) => {
    const post: AdminPost = {
      id: nextId(store.posts),
      title: input.title,
      slug: slugify(input.title) || `post-${Date.now()}`,
      author: input.author,
      categories: input.categories.length ? input.categories : ["Uncategorised"],
      comments: 0,
      date: nowStamp(),
      status: input.status,
      excerpt: input.excerpt,
      content: input.content,
      image: "/images/open-pit-mine.jpg",
    };
    store.posts.unshift(post);
    return post;
  });
}

export function updatePost(id: number, input: PostInput) {
  return mutate((store) => {
    const index = store.posts.findIndex((post) => post.id === id);
    if (index === -1) return null;
    const existing = store.posts[index];
    store.posts[index] = {
      ...existing,
      title: input.title,
      slug: slugify(input.title) || existing.slug,
      content: input.content,
      excerpt: input.excerpt,
      status: input.status,
      author: input.author,
      categories: input.categories.length ? input.categories : existing.categories,
    };
    return store.posts[index];
  });
}

export function deletePost(id: number) {
  return mutate((store) => {
    store.posts = store.posts.filter((post) => post.id !== id);
  });
}

/* ------------------------------- Pages ------------------------------- */

export async function getPages() {
  return (await readStore()).pages;
}

export async function getPage(id: number) {
  return (await readStore()).pages.find((page) => page.id === id) ?? null;
}

export type PageInput = {
  title: string;
  content: string;
  status: PostStatus;
  template: string;
  author: string;
};

export function createPage(input: PageInput) {
  return mutate((store) => {
    const page: AdminPage = {
      id: nextId(store.pages),
      title: input.title,
      slug: slugify(input.title) || `page-${Date.now()}`,
      author: input.author,
      date: nowStamp(),
      status: input.status,
      template: input.template,
      content: input.content,
    };
    store.pages.push(page);
    return page;
  });
}

export function updatePage(id: number, input: PageInput) {
  return mutate((store) => {
    const index = store.pages.findIndex((page) => page.id === id);
    if (index === -1) return null;
    const existing = store.pages[index];
    store.pages[index] = {
      ...existing,
      title: input.title,
      slug: slugify(input.title) || existing.slug,
      status: input.status,
      template: input.template,
      author: input.author,
      content: input.content,
    };
    return store.pages[index];
  });
}

export function deletePage(id: number) {
  return mutate((store) => {
    store.pages = store.pages.filter((page) => page.id !== id);
  });
}

/* ------------------------------- Media ------------------------------- */

export async function getMedia() {
  return (await readStore()).media;
}

/* ------------------------------ Gallery ------------------------------ */

export async function getGalleryItems() {
  return (await readStore()).gallery;
}

export function addGalleryItem(input: {
  title: string;
  category: string;
  src: string;
}) {
  return mutate((store) => {
    const item: GalleryItem = {
      id: nextId(store.gallery),
      title: input.title,
      category: input.category,
      src: input.src,
      uploaded: todayLabel(),
    };
    store.gallery.unshift(item);
    return item;
  });
}

export function deleteGalleryItem(id: number) {
  return mutate((store) => {
    store.gallery = store.gallery.filter((item) => item.id !== id);
  });
}

/* ------------------------------ Messages ----------------------------- */

export async function getMessages() {
  return (await readStore()).messages;
}

export async function getUnreadMessageCount() {
  const store = await readStore();
  return store.messages.filter((message) => message.unread).length;
}

export function addMessage(input: {
  name: string;
  email: string;
  company: string;
  subject: string;
  body: string;
}) {
  return mutate((store) => {
    const message: Message = {
      id: nextId(store.messages),
      name: input.name,
      email: input.email,
      company: input.company || "—",
      subject: input.subject,
      excerpt: input.body.slice(0, 160),
      date: todayLabel(),
      unread: true,
    };
    store.messages.unshift(message);
    return message;
  });
}

export function setMessageRead(id: number, unread: boolean) {
  return mutate((store) => {
    const message = store.messages.find((item) => item.id === id);
    if (message) message.unread = unread;
  });
}

export function deleteMessage(id: number) {
  return mutate((store) => {
    store.messages = store.messages.filter((message) => message.id !== id);
  });
}

/* ------------------------------- Users ------------------------------- */

export async function getUsers() {
  return (await readStore()).users;
}
