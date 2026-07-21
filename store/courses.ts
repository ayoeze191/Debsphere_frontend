import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CoursesAPI from "@/services/courses";
import type { Course } from "@/types/course";

export type ICourse = Course;

export interface CourseState {
  courses: ICourse[];
  loadingCourses: boolean;
  fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseState>()(
  devtools(
    (set) => ({
      courses: [],
      loadingCourses: false,
      fetchCourses: async () => {
        try {
          set({ loadingCourses: true });
          const req = await CoursesAPI.getCourses();
          const data = req.data.courses;
          set({
            courses: data,
            loadingCourses: false,
          });
        } catch (error) {
          console.error(error);
          set({ loadingCourses: false });
        }
      },
    }),
    { name: "coursesStore" },
  ),
);
