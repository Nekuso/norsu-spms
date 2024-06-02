/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import ReturnsContent from "./returns-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

import { useReturns } from "@/hooks/useReturns";
import { useDispatch, useSelector } from "react-redux";
import { useSectors } from "@/hooks/useSectors";
import { HomeIcon } from "lucide-react";
import { setSectorsData } from "@/redux/slices/sectorsSlice";
import { useSupplies } from "@/hooks/useSupplies";
import { setMainSupplies } from "@/redux/slices/mainSuppliesSlice";
import { setRequests } from "@/redux/slices/requestSlice";
import { useMainSupplies } from "@/hooks/useMainSupplies";

export default function Returns() {
  const dispatch = useDispatch();
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );
  const { getReturns, allReturnsData } = useReturns();
  // const { getSupplies, allSuppliesData } = useSupplies();
  const { getSupplies, allSectorSuppliesData } = useMainSupplies();

  const { getSectors, allSectorsData } = useSectors();

  const sectorsData = allSectorsData.map((sector: any) => ({
    id: sector?.id,
    value: sector?.sector_name,
    label: sector?.sector_name,
    icon: HomeIcon,
  }));

  const requestCart = useSelector((state: any) => state.requestCart);

  const allMainSuppliesData = allSectorSuppliesData;
  dispatch(setSectorsData(sectorsData));
  dispatch(setMainSupplies(allMainSuppliesData));
  dispatch(setRequests({ allMainSuppliesData, requestCart }));

  useEffect(() => {
    const { error } = getReturns(currentSession);
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getSectors();
    getSupplies(currentSession.sectors.id);
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("requests-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "returns" },
        (payload: any) => {
          getReturns(currentSession);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sector_supplies" },
        (payload: any) => {
          getSupplies(currentSession.sectors.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribedChannel);
    };
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Returns</h1>
      </div>
      <ReturnsContent dataReturns={allReturnsData} />
    </main>
  );
}
