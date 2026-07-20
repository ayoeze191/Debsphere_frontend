import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CoursesAPI from "@/services/courses";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  isPublished: boolean;
  categoryId: string;
  instructorId: string;
  duration: string;
  outcomes: [];
  category: { name: string };
}

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
          console.log(req.data.courses);
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
