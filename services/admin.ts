import api from "../axios"; // assumes your existing axios instance with auth headers attached
import type { AxiosResponse } from "axios";
import type {
  AdminCategory,
  AdminDashboardStats,
  AdminPayment,
  AdminRole,
  AdminUser,
  PaymentStatus,
} from "@/types/admin";

type AdminPayload = Record<string, unknown>;

const AdminAPI = {
  getDashboard: (): Promise<AxiosResponse<AdminDashboardStats>> =>
    api.get("/admin/dashboard"),

  // Users
  listUsers: (): Promise<AxiosResponse<{ users: AdminUser[] }>> =>
    api.get("/admin/users"),
  updateUser: (id: string, data: { role: AdminRole }) =>
    api.patch(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  // Categories
  listCategories: (): Promise<AxiosResponse<{ categories: AdminCategory[] }>> =>
    api.get("/admin/categories"),
  createCategory: (data: { name: string }) =>
    api.post("/admin/categories", data),
  updateCategory: (id: string, data: { name: string }) =>
    api.patch(`/admin/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/admin/categories/${id}`),

  // Courses
  listCourses: () => api.get("/admin/courses"),
  createCourse: (data: AdminPayload) => api.post("/admin/courses", data),
  updateCourse: (id: string, data: AdminPayload) =>
    api.patch(`/admin/courses/${id}`, data),
  deleteCourse: (id: string) => api.delete(`/admin/courses/${id}`),

  // Sections
  createSection: (courseId: string, data: AdminPayload) =>
    api.post(`/admin/courses/${courseId}/sections`, data),
  updateSection: (id: string, data: AdminPayload) =>
    api.patch(`/admin/sections/${id}`, data),
  deleteSection: (id: string) => api.delete(`/admin/sections/${id}`),

  // Lessons
  createLesson: (sectionId: string, data: AdminPayload) =>
    api.post(`/admin/sections/${sectionId}/lessons`, data),
  updateLesson: (id: string, data: AdminPayload) =>
    api.patch(`/admin/lessons/${id}`, data),
  deleteLesson: (id: string) => api.delete(`/admin/lessons/${id}`),

  // Enrollments
  listEnrollments: () => api.get("/admin/enrollments"),
  deleteEnrollment: (id: string) => api.delete(`/admin/enrollments/${id}`),

  // Payments
  listPayments: (): Promise<AxiosResponse<{ payments: AdminPayment[] }>> =>
    api.get("/admin/payments"),
  updatePayment: (id: string, status: PaymentStatus) =>
    api.patch(`/admin/payments/${id}`, { status }),

  // Reviews
  listReviews: () => api.get("/admin/reviews"),
  deleteReview: (id: string) => api.delete(`/admin/reviews/${id}`),

  // Certificates
  listCertificates: () => api.get("/admin/certificates"),

  // Webhook events
  listWebhookEvents: () => api.get("/admin/webhook-events"),

  // Video
  updateVideo: (id: string, data: AdminPayload) =>
    api.patch(`/admin/videos/${id}`, data),
};

export default AdminAPI;
