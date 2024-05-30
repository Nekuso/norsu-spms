/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import ProposalsContent from "./proposals-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

import { useProposals } from "@/hooks/useProposals";
import { useDispatch, useSelector } from "react-redux";
import { useSectors } from "@/hooks/useSectors";
import { HomeIcon } from "lucide-react";
import { setSectorsData } from "@/redux/slices/sectorsSlice";

export default function Proposals() {
  const dispatch = useDispatch();
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );
  const { getProposals, allProposalsData } = useProposals();

  const { getSectors, allSectorsData } = useSectors();

  const sectorsData = allSectorsData.map((sector: any) => ({
    id: sector?.id,
    value: sector?.sector_name,
    label: sector?.sector_name,
    icon: HomeIcon,
  }));

  dispatch(setSectorsData(sectorsData));

  useEffect(() => {
    const { error } = getProposals(currentSession);
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getSectors();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("proposals-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "proposals" },
        (payload: any) => {
          getProposals(currentSession);
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
        <h1 className="text-lg font-semibold md:text-2xl">Proposals</h1>
      </div>
      <ProposalsContent dataRequests={allProposalsData} />
    </main>
  );
}
