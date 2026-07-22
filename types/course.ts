export interface Category {
  id: string;
  name: string;
  _count: {
    courses: number;
  };
}
export interface Instructor {
  name: string;
}

export interface LessonProgress {
  watched: boolean;
  completedAt: string | null;
}

export interface Lesson {
  id: string;
  position: number;
  title: string;
  description?: string | null;
  duration: number;
  video?: LessonVideo | null;
  progress?: LessonProgress[];
}

export interface LessonVideo {
  hlsUrl?: string | null;
  originalUrl?: string | null;
  thumbnail?: string | null;
  status: "PROCESSING" | "READY" | "FAILED";
}

export interface CourseSection {
  id: string;
  position: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  thumbnail: string;
  isPublished?: boolean;
  categoryId?: string;
  instructorId?: string;
  category?: Category;
  instructor?: Instructor;
  outcomes: string[];
  sections: CourseSection[];
}

export interface Enrollment {
  id: string;
  course: Course;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastLesson?: Pick<Lesson, "id" | "title"> | null;
  lastLessonId?: string | null;
}
