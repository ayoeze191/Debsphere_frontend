export type AdminRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface AdminDashboardStats {
  users: number;
  courses: number;
  publishedCourses: number;
  enrollments: number;
  successfulPayments: number;
  revenue: number;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
  _count?: {
    enrollments?: number;
    courses?: number;
  };
}

export interface AdminPayment {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  amount: number;
  status: PaymentStatus;
  course?: {
    title: string;
  } | null;
}

export interface AdminCategory {
  id: string;
  name: string;
  _count: {
    courses: number;
  };
}
