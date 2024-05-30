/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import RestockReportContent from "./restock-report-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRestockReports } from "@/hooks/useRestockReports";
import RestockReportNotFound from "./not-found";
import Skeleton from "./skeleton";

export default function Report({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getRestockReport, currentRestockReport } = useRestockReports();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getRestockReport(params.id, 1000);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("restock-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "restock_reports" },
          (payload: any) => {
            getRestockReport(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center bg-slate-300">
      {error ? (
        <RestockReportNotFound />
      ) : currentRestockReport.length === 0 ? (
        <Skeleton />
      ) : (
        <RestockReportContent
          params={params}
          restockReport={currentRestockReport}
        />
      )}
    </div>
  );
}
