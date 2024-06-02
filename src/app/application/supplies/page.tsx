/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import StocksContent from "./supply-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PiRulerBold } from "react-icons/pi";

import { setUOMSData } from "@/redux/slices/uomsSlice";
import { useDispatch } from "react-redux";
import { useUOMS } from "@/hooks/useUOMS";
import { useSupplies } from "@/hooks/useSupplies";
import { useSupplyCategories } from "@/hooks/useSupplyCategories";
import { setSupplyCategories } from "@/redux/slices/supplyCategoriesSlice";
import { setMainSupplies } from "@/redux/slices/mainSuppliesSlice";

export default function Supplies() {
  const dispatch = useDispatch();
  const { getSupplies, allSuppliesData } = useSupplies();
  const { getSupplyCategories, allSupplyCategoriesData } =
    useSupplyCategories();

  console.log(allSuppliesData);
  const { getUOMS, allUOMSData } = useUOMS();

  const uomsData = allUOMSData.map((uom: any) => ({
    id: uom?.id,
    value: uom?.unit_name,
    label: uom?.unit_name,
    icon: PiRulerBold,
  }));
  const supplyCategoriesData = allSupplyCategoriesData.map((category: any) => ({
    id: category?.id,
    value: category?.name,
    label: category?.name,
  }));

  dispatch(setUOMSData(uomsData));
  dispatch(setSupplyCategories(supplyCategoriesData));

  useEffect(() => {
    const { error } = getSupplies();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getUOMS();
    getSupplyCategories();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("supply-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sector_supplies" },
        (payload: any) => {
          getSupplies();
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
        <h1 className="text-lg font-semibold md:text-2xl">Supplies</h1>
      </div>
      <StocksContent dataStocks={allSuppliesData} />
    </main>
  );
}
