import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useMainSupplies: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allMainSuppliesData, setMainSuppliesData] = useState<any>([]);
  const [currentMainSupply, setCurrentMainSupplyData] = useState<any>([]);

  const createMainSupply = async (props: any, duration?: any) => {
    const result = await supabase.from("main_supplies").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      supply_quantity: props.stock_quantity,
      uom_id: props.uom_id,
      price: props.price,
      barcode: props.barcode,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getMainSupplies = async () => {
    const result = await supabase
      .from("main_supplies")
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
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setMainSuppliesData(data);
  };
  const getMainSupply = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("main_supplies")
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
    return setCurrentMainSupplyData(data);
  };

  const updateMainSupplies = async (props: any, duration?: number) => {
    const supplies = props.restock_supplies;
    const result = await supabase.rpc("updateorcreatesupplies", {
      supplies,
    });
    if (result.error) {
      return result.error;
    }

    const reportResult: any = await supabase
      .from("restock_reports")
      .insert({
        employee_id: props.employee_id,
        total_price: props.total_price,
      })
      .select();

    if (reportResult.error) {
      return reportResult.error;
    }

    const reportEntriesResult = await supabase
      .from("restock_report_entries")
      .insert(
        props.restock_supplies.map((supply: any) => {
          return {
            restock_report_id: reportResult.data[0].id,
            name: supply.name,
            description: supply.description,
            image_url: supply.image,
            supply_quantity: supply.quantity,
            supply_category: supply.supply_category,
            uom_id: supply.uom_id,
            price: supply.price,
            barcode: supply.barcode,
          };
        })
      )
      .select();
    console.log(reportEntriesResult);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const deleteMainSupply = async (props: any, duration: number = 2000) => {
    const result = await supabase
      .from("main_supplies")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    allMainSuppliesData,
    currentMainSupply,

    // methods
    createMainSupply,
    getMainSupply,
    getMainSupplies,
    updateMainSupplies,
    deleteMainSupply,
  };
};
