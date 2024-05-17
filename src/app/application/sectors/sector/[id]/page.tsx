/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import DepartmentContent from "./sector-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import DepartmentNotFound from "./not-found";
import Skeleton from "./skeleton";
import { useSectors } from "@/hooks/useSectors";

export default function Sector({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getSector, currentSector } = useSectors();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getSector(params.id, 1000);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("sector-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "sectors" },
          (payload: any) => {
            getSector(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      {error ? (
        <DepartmentNotFound />
      ) : currentSector.length === 0 ? (
        <Skeleton />
      ) : (
        <DepartmentContent params={params} sector={currentSector} />
      )}
    </div>
  );
}
