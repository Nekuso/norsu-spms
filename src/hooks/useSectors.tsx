import { QueryData, createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useSectors: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allSectorsData, setAllSectorsData] = useState<any>([]);
  const [currentSector, setCurrentSectorData] = useState<any>([]);

  const createSector = async (props: any, duration?: any) => {
    const result = await supabase.from("sectors").insert({
      sector_name: props.sector_name,
      description: props.description,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  const getSectors = async () => {
    const result = await supabase
      .from("sectors")
      .select(
        `
      id,
      sector_name,
      description,
      image_url,
      created_at
    `
      )
      .order("created_at", { ascending: false });
    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllSectorsData(data);
  };

  const getSector = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("sectors")
      .select(
        `
      id,
      sector_name,
      description,
      image_url,
      created_at
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentSectorData(data);
  };
  const updateSector = async (props: any, duration?: number) => {
    const result = await supabase
      .from("sectors")
      .update({
        sector_name: props.sector_name,
        description: props.description,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteSector = async (props: any, duration?: number) => {
    const result = await supabase.from("sectors").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allSectorsData,
    currentSector,

    // methods
    createSector,
    getSectors,
    getSector,
    updateSector,
    deleteSector,
  };
};
