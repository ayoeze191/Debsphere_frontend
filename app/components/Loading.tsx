// components/Loading.tsx
"use client";

import React from "react";

type LoadingProps<T> = {
  /** The value being awaited. Pass `null` or `undefined` while it's still loading. */
  data: T | null | undefined;
  /** Render prop — only called once `data` is present. */
  children: (data: T) => React.ReactNode;
  /** Optional custom placeholder shown while `data` is null/undefined. Defaults to a single skeleton bar. */
  skeleton?: React.ReactNode;
};

/**
 * Usage:
 *   <Loading data={course} skeleton={<Skeleton className="h-8 w-64" />}>
 *     {(course) => <h1>{course.title}</h1>}
 *   </Loading>
 */
export default function Loading<T>({
  data,
  children,
  skeleton,
}: LoadingProps<T>) {
  if (data === null || data === undefined) {
    return <>{skeleton ?? <Skeleton className="h-4 w-24" />}</>;
  }
  return <>{children(data)}</>;
}

/**
 * A single pulsing placeholder bar. Compose several to build a skeleton
 * that roughly matches the shape of the content it's standing in for.
 *   <Skeleton className="h-10 w-3/4" />        // heading
 *   <Skeleton className="h-4 w-full mt-2" />   // text line
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse ${className}`}
      style={{ background: "var(--rule)" }}
    />
  );
}
