import AxiosInstance from "../axios";

const CoursesAPI = {
  getCourses: async () => {
    return await AxiosInstance.get("/courses");
  },
  getSingleCourse: async (id: string) => {
    return await AxiosInstance.get(`/courses/${id}`);
  },
};

export default CoursesAPI;
