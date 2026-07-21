import CoursePage from "@/app/components/CourseDetailsPage";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div>
      <CoursePage slug={slug} />
    </div>
  );
}
