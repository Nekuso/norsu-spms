"use client";
import LoadingPage from "@/components/layout/loading/loader";

export default function UserSkeleton() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <LoadingPage />
    </div>
  );
}
