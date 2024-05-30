/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import RequestContent from "./request-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import NotFound from "./not-found";
import Skeleton from "./skeleton";
import { useRequests } from "@/hooks/useRequests";

export default function Request({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getRequest, currentRequest } = useRequests();
  useEffect(() => {
    const initialFetch = async () => {
      const result = await getRequest(params, 1000);
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
          { event: "*", schema: "public", table: "requests" },
          (payload: any) => {
            getRequest(params, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Request</h1>
      </div>
      {error ? (
        <NotFound />
      ) : currentRequest.length === 0 ? (
        <Skeleton />
      ) : (
        <RequestContent dataRequest={currentRequest} />
      )}
    </main>
  );
}
