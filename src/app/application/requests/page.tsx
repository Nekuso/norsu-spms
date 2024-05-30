/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import RequestsContent from "./requests-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

import { useRequests } from "@/hooks/useRequests";
import { useDispatch, useSelector } from "react-redux";
import { useSectors } from "@/hooks/useSectors";
import { HomeIcon } from "lucide-react";
import { setSectorsData } from "@/redux/slices/sectorsSlice";
import { useMainSupplies } from "@/hooks/useMainSupplies";
import { setMainSupplies } from "@/redux/slices/mainSuppliesSlice";
import { setRequests } from "@/redux/slices/requestSlice";

export default function Reports() {
  const dispatch = useDispatch();
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );
  const { getRequests, allRequestsData } = useRequests();
  const { getMainSupplies, allMainSuppliesData } = useMainSupplies();

  const { getSectors, allSectorsData } = useSectors();

  const sectorsData = allSectorsData.map((sector: any) => ({
    id: sector?.id,
    value: sector?.sector_name,
    label: sector?.sector_name,
    icon: HomeIcon,
  }));

  const requestCart = useSelector((state: any) => state.requestCart);

  dispatch(setSectorsData(sectorsData));
  dispatch(setMainSupplies(allMainSuppliesData));
  dispatch(setRequests({ allMainSuppliesData, requestCart }));

  useEffect(() => {
    const { error } = getRequests(currentSession);
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getSectors();
    getMainSupplies();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("requests-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests" },
        (payload: any) => {
          getRequests(currentSession);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "main_supplies" },
        (payload: any) => {
          getMainSupplies();
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
        <h1 className="text-lg font-semibold md:text-2xl">Requests</h1>
      </div>
      <RequestsContent dataRequests={allRequestsData} />
    </main>
  );
}
