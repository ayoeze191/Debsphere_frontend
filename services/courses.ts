import AxiosInstance from "../axios";
import type { AxiosResponse } from "axios";
import type { Course, Enrollment } from "@/types/course";

type CoursesResponse = { courses: Course[] };
type CourseResponse = { course: Course };
type EnrollmentsResponse = { enrolledCourses: Enrollment[] };

const CoursesAPI = {
  getCourses: async (): Promise<AxiosResponse<CoursesResponse>> => {
    return AxiosInstance.get("/courses");
  },
  getSingleCourse: async (slug: string): Promise<AxiosResponse<CourseResponse>> => {
    return AxiosInstance.get(`/courses/${slug}`);
  },
  getEnrolledCourse: async (): Promise<AxiosResponse<EnrollmentsResponse>> => {
    return AxiosInstance.get("/learn/courses");
  },
  getCourseForLearning: async (slug: string): Promise<AxiosResponse<CourseResponse>> => {
    return AxiosInstance.get("/learn/" + slug);
  },
  markLessonComplete: async (lessonId: string, nowComplete: boolean) => {
    return AxiosInstance.post("/learn/markascomplete", {
      lessonId,
      nowComplete,
    });
  },
};

export default CoursesAPI;
