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
      stock_quantity: props.stock_quantity,
      uom_id: props.uom_id,
      price: props.price,
      qrcode: props.qrcode,
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
        stock_quantity,
        uoms(
            id,
            unit_name
        ),
        supply_categories(
          id, name
        ),
        price,
        qrcode,
        status,
        created_at
      `
      )
      .eq("id", id);
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentMainSupplyData(data);
  };

  const updateMainSupply = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_supplies")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        qrcode: props.qrcode,
        uom_id: props.uom_id,
        stock_quantity: props.stock_quantity,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);
    console.log(result);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateMainSupplyStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_supplies")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
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
    updateMainSupply,
    updateMainSupplyStatus,
    deleteMainSupply,
  };
};
