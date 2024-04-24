import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useMainStocks: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allStocksData, setStocksData] = useState<any>([]);
  const [currentStock, setCurrentStockData] = useState<any>([]);

  const createStock = async (props: any, duration?: any) => {
    const result = await supabase.from("main_stocks").insert({
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
  const getStocks = async () => {
    const result = await supabase
      .from("main_stocks")
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
        price,
        qrcode,
        status,
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setStocksData(data);
  };
  const getStock = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("main_stocks")
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
        price,
        qrcode,
        status,
        created_at
      `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentStockData(data);
  };
  const updateStock = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_stocks")
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
  const updateStockStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_stocks")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteStock = async (props: any, duration: number = 2000) => {
    const result = await supabase
      .from("main_stocks")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    allStocksData,
    currentStock,

    // methods
    createStock,
    getStock,
    getStocks,
    updateStock,
    updateStockStatus,
    deleteStock,
  };
};
