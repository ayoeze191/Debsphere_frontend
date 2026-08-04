"use client";

import { useEffect } from "react";
import SingleCourse from "./SingleCourse";
import { useCourseStore } from "@/store/courses";

export default function Courses() {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-4">
      {courses.map((course) => (
        <SingleCourse key={course.id} course={course} />
      ))}
    </section>
  );
}
