/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import SupplyContent from "./main-supply-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import StockNotFound from "./not-found";
import Skeleton from "./skeleton";
import { useMainSupplies } from "@/hooks/useMainSupplies";
import { useUOMS } from "@/hooks/useUOMS";

export default function Supply({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getMainSupply, currentMainSupply } = useMainSupplies();
  const { getUOMS, allUOMSData } = useUOMS();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getMainSupply(params.id, 1000);
      if (result) setError(result);
      getUOMS();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("stock-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "main_stocks" },
          (payload: any) => {
            getMainSupply(params.id, 0);
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
        <StockNotFound />
      ) : currentMainSupply.length === 0 ? (
        <Skeleton />
      ) : (
        <SupplyContent
          params={params}
          stock={currentMainSupply}
          uoms={allUOMSData}
        />
      )}
    </div>
  );
}
