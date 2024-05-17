import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useSupplyCategories: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allSupplyCategoriesData, setSupplyCategoriesData] = useState<any>([]);
  const [currentSupplyCategories, setCurrentSupplyCategories] = useState<any>(
    []
  );

  const createSupplyCategories = async (props: any, duration?: any) => {
    const result = await supabase.from("supply_categories").insert({
      name: props.name,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getSupplyCategories = async () => {
    const result = await supabase
      .from("supply_categories")
      .select(
        `
        id,
        name,
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setSupplyCategoriesData(data);
  };
  const getSupplyCategory = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("supply_categories")
      .select(
        `
        id,
        name,
        created_at
      `
      )
      .eq("id", id);
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentSupplyCategories(data);
  };

  const updateSupplyCategory = async (props: any, duration?: number) => {
    const result = await supabase
      .from("supply_categories")
      .update({
        name: props.name,
      })
      .eq("id", props.id);
    console.log(result);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const deleteSupplyCategory = async (props: any, duration: number = 2000) => {
    const result = await supabase
      .from("supply_categories")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    allSupplyCategoriesData,
    currentSupplyCategories,

    // methods
    createSupplyCategories,
    getSupplyCategory,
    getSupplyCategories,
    updateSupplyCategory,
    deleteSupplyCategory,
  };
};
