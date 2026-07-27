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

export interface AdminCourse {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  price: number;
  isPublished: boolean;
  duration?: string | null;
  category?: { id: string; name: string } | null;
  instructor: Pick<AdminUser, "id" | "firstName" | "lastName" | "email">;
  _count: { sections: number; enrollments: number; payment: number };
}
