import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { getPage } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await getPage(Number(id));
  if (!page) notFound();

  return <PageEditor page={page} />;
}
