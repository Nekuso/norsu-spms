/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import ReturnContent from "./return-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import NotFound from "./not-found";
import Skeleton from "./skeleton";
import { useReturns } from "@/hooks/useReturns";
import { useSelector } from "react-redux";

export default function Request({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getReturn, currentReturn } = useReturns();
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getReturn(params, 500);

      if (result) setError(result);
    };
    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("request-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "returns" },
          (payload: any) => {
            getReturn(params, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-300">
      {error ? (
        <NotFound />
      ) : currentReturn.length === 0 ? (
        <Skeleton />
      ) : (
        <ReturnContent dataReturn={currentReturn} />
      )}
    </main>
  );
}
