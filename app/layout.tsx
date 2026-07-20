// app/layout.tsx (Root Layout)
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Debsphere Academy",
  description:
    "Bridging the gap between classroom learning and industry experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
