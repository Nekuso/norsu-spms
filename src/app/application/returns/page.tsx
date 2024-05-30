/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import ReportsContent from "./returns-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

import { useDispatch } from "react-redux";
import { useRestockReports } from "@/hooks/useRestockReports";

export default function Returns() {
  // const { getRestockReports, allRestockReportsData } = useRestockReports();

  // useEffect(() => {
  //   const { error } = getRestockReports();
  //   if (error?.message) {
  //     toast({
  //       variant: "destructive",
  //       title: "⚠️ Error",
  //       description: error.message,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const supabase = createSupabaseBrowserClient();
  //   const subscribedChannel = supabase
  //     .channel("restock-follow-up")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "requests" },
  //       (payload: any) => {
  //         getRestockReports();
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(subscribedChannel);
  //   };
  // }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Returns</h1>
      </div>
    </main>
  );
}
