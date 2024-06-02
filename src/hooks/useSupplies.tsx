import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useSupplies: any = () => {
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allSuppliesData, setSuppliesData] = useState<any>([]);
  const [currentSupply, setCurrentSupplyData] = useState<any>([]);

  const getSupplies = async () => {
    const result = await supabase
      .from("sector_supplies")
      .select(
        `
        id,
        sectors(*),
        name,
        description,
        image_url,
        supply_quantity,
        uoms(
          id,
          unit_name
        ),
        supply_categories(
          id, name
        ),
        price,
        barcode,
        status,
        created_at
    `
      )
      .order("created_at", { ascending: false })
      .eq("department_id", currentSession.sectors.id);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setSuppliesData(data);
  };
  const getSupply = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("sector_supplies")
      .select(
        `
        id,
        name,
        description,
        image_url,
        supply_quantity,
        uoms(
            id,
            unit_name
        ),
        supply_categories(
          id, name
        ),
        price,
        barcode,
        status,
        created_at
      `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentSupplyData(data);
  };

  return {
    // states
    allSuppliesData,
    currentSupply,

    // methods
    getSupply,
    getSupplies,
  };
};
