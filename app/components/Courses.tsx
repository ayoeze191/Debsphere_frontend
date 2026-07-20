"use client";

import { BarChart3, Briefcase, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import SingleCourse from "./SingleCourse";
import { useCourseStore } from "@/store/courses";
// const courses: ICourse[] = [
//   {
//     ref: "A1",
//     category: "Data & Analytics",
//     title: "Microsoft Excel Course",
//     desc: "Develop practical Excel skills for data analysis, reporting, automation, and business productivity. Built for beginners and professionals sharpening their analytical edge.",
//     duration: "3 Weeks",
//     price: "10,000",
//     icon: BarChart3,
//     outcomes: [
//       "Confidently navigate and use Microsoft Excel",
//       "Clean, organize, and analyze data efficiently",
//       "Build formulas, functions, charts, and dashboards",
//       "Generate professional reports",
//       "Improve workplace productivity using Excel",
//     ],
//   },
//   {
//     ref: "B1",
//     category: "Finance & Accounting",
//     title: "QuickBooks Training",
//     desc: "Master QuickBooks for modern business accounting. Learn to manage financial records, track income and expenses, and run essential bookkeeping with confidence.",
//     duration: "4 Weeks",
//     price: "10,000",
//     icon: Briefcase,
//     outcomes: [
//       "Set up and manage a QuickBooks company file",
//       "Record daily business transactions accurately",
//       "Manage customers, vendors, and inventory",
//       "Generate and interpret financial reports",
//       "Apply QuickBooks in real accounting roles",
//     ],
//   },
//   {
//     // ref: "C1",
//     category: "Investing & Wealth",
//     title: "Stock Market Investing Masterclass",
//     desc: "Learn to confidently invest by understanding how markets work, identifying quality stocks, analyzing companies, and building a long-term portfolio.",
//     duration: "12 Hours",
//     price: "5,000",
//     icon: TrendingUp,
//     outcomes: [
//       "Buy and sell stocks with confidence",
//       "Identify good stocks to invest in",
//       "Analyze companies using fundamental analysis",
//       "Read and interpret basic stock charts",
//       "Build a diversified investment portfolio",
//       "Develop a long-term wealth creation strategy",
//       "Understand and manage investment risk",
//     ],
//   },
// ];

export default function Courses() {
  const courseStore = useCourseStore();

  useEffect(() => {
    const getCourses = async () => {
      console.log("Getting courses");
      await courseStore.fetchCourses();
    };
    getCourses();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6">
      {courseStore.courses.map((course) => (
        <SingleCourse key={course.id} course={course} />
      ))}
    </section>
  );
}
