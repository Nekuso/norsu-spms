import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useReturns: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allReturnsData, setReturnsData] = useState<any>([]);
  const [currentReturn, setCurrentReturnData] = useState<any>([]);

  const createReturn = async (data: any) => {
    const result: any = await supabase
      .from("returns")
      .insert({
        sector_id: data.sector_id,
        total_price: data.total_price,
        status: "Returned",
      })
      .select();

    if (result.error) {
      return result;
    }
    const returnEntries = await supabase.from("return_supply_entries").insert(
      data.restock_supplies.map((entry: any) => ({
        return_id: result.data[0].id,
        quantity: entry.quantity,
        price: entry.price,
        supply_category: entry.supply_category,
        name: entry.name,
        description: entry.description,
        image_url: entry.image,
        barcode: entry.barcode,
        uom_id: entry.uom_id,
      }))
    );

    const resultEntries = await supabase.rpc(
      "deduct_supplies_from_department",
      {
        p_department_id: data.sector_id,
        supply_entries: data.restock_supplies.map((entry: any) => ({
          return_id: result.data[0].id,
          main_supply_id: entry.mainSupplyId,
          quantity: entry.quantity,
          price: entry.price,
          supply_category: entry.supply_category,
          name: entry.name,
          description: entry.description,
          image_url: entry.image,
          barcode: entry.barcode,
          uom_id: entry.uom_id,
        })),
      }
    );

    console.log(resultEntries);
    if (resultEntries.error) {
      return resultEntries;
    }
    return result;
  };

  const getReturns = async (props: any) => {
    const result =
      props?.roles?.role === "Sector"
        ? await supabase
            .from("returns")
            .select(
              `
                id,
                sectors(*),
                status,
                remarks,
                total_price,
                created_at
            `
            )
            .eq("sector_id", props?.sectors?.id)
        : await supabase
            .from("returns")
            .select(
              `
            id,
            sectors(*),
            status,
            remarks,
            total_price,
            created_at
      `
            )
            .order("created_at", { ascending: false });
    const { data, error } = result;

    console.log(result);
    if (error) {
      return error;
    }
    return setReturnsData(data);
  };
  const getReturn = async (props?: any) => {
    const result = await supabase
      .from("returns")
      .select(
        `
          id,
          sectors(*),
          status,
          remarks,
          total_price,
          return_supply_entries(*,uoms(*),supply_categories(*)),
          created_at
      `
      )
      .eq("id", props.id);
    const { data, error } = result;
    if (error) {
      return error;
    }
    return setCurrentReturnData(data);
  };

  return {
    // states
    allReturnsData,
    currentReturn,

    // methods
    createReturn,
    getReturns,
    getReturn,
  };
};
