"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PostStatus } from "@/lib/admin-data";
import {
  addGalleryItem,
  createPage,
  createPost,
  deleteGalleryItem,
  deleteMessage,
  deletePage,
  deletePost,
  setMessageRead,
  updatePage,
  updatePost,
} from "@/lib/store";

function asStatus(value: FormDataEntryValue | null): PostStatus {
  return value === "Published" || value === "Pending" ? value : "Draft";
}

function asText(value: FormDataEntryValue | null, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function refreshAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/gallery");
  revalidatePath("/admin/messages");
}

export async function savePost(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const input = {
    title: asText(formData.get("title")) || "Untitled",
    content: asText(formData.get("content")),
    excerpt: asText(formData.get("excerpt")),
    status: asStatus(formData.get("status")),
    author: asText(formData.get("author"), "Kwame Mensah"),
    categories: formData.getAll("categories").map(String).filter(Boolean),
  };

  if (id) await updatePost(id, input);
  else await createPost(input);

  refreshAdmin();
  redirect("/admin/posts");
}

export async function trashPost(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (id) await deletePost(id);
  refreshAdmin();
  redirect("/admin/posts");
}

export async function quickDraft(formData: FormData) {
  const title = asText(formData.get("title"));
  const content = asText(formData.get("content"));
  if (!title) redirect("/admin");

  const post = await createPost({
    title,
    content,
    excerpt: "",
    status: "Draft",
    author: "Kwame Mensah",
    categories: ["Uncategorised"],
  });

  refreshAdmin();
  redirect(`/admin/posts/${post.id}`);
}

export async function savePage(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const input = {
    title: asText(formData.get("title")) || "Untitled",
    content: asText(formData.get("content")),
    status: asStatus(formData.get("status")),
    template: asText(formData.get("template"), "Default"),
    author: asText(formData.get("author"), "Kwame Mensah"),
  };

  if (id) await updatePage(id, input);
  else await createPage(input);

  refreshAdmin();
  redirect("/admin/pages");
}

export async function trashPage(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (id) await deletePage(id);
  refreshAdmin();
  redirect("/admin/pages");
}

export async function addGallery(formData: FormData) {
  const title = asText(formData.get("title"));
  const src = asText(formData.get("src"));
  if (title && src) {
    await addGalleryItem({
      title,
      category: asText(formData.get("category"), "Operations"),
      src,
    });
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  redirect("/admin/gallery");
}

export async function removeGallery(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (id) await deleteGalleryItem(id);
  revalidatePath("/admin/gallery");
  revalidatePath("/admin");
  redirect("/admin/gallery");
}

export async function markMessageRead(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const unread = formData.get("unread") === "1";
  if (id) await setMessageRead(id, unread);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  redirect("/admin/messages");
}

export async function trashMessage(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (id) await deleteMessage(id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  redirect("/admin/messages");
}
