/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import SectorsContent from "./sectors-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useSectors } from "@/hooks/useSectors";
import { HomeIcon } from "lucide-react";
import { setSectorsData } from "@/redux/slices/sectorsSlice";
import { useDispatch } from "react-redux";

export default function Departments() {
  const dispatch = useDispatch();
  const { getSectors, allSectorsData } = useSectors();

  const sectorsData = allSectorsData.map((sector: any) => ({
    id: sector?.id,
    value: sector?.sector_name,
    label: sector?.sector_name,
    icon: HomeIcon,
  }));
  dispatch(setSectorsData(sectorsData));

  useEffect(() => {
    const { error } = getSectors();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("departments-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sectors" },
        (payload: any) => {
          getSectors();
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
        <h1 className="text-lg font-semibold md:text-2xl">Sectors</h1>
      </div>
      <SectorsContent dataSectors={allSectorsData} />
    </main>
  );
}
