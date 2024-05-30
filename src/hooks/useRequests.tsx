import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useRequests: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allRequestsData, setRequestsData] = useState<any>([]);
  const [currentRequest, setCurrentRequestData] = useState<any>([]);

  const createRequest = async (data: any) => {
    const result: any = await supabase
      .from("requests")
      .insert({
        sector_id: data.sector_id,
        total_price: data.total_price,
        status: "Pending",
      })
      .select();

    if (result.error) {
      return result;
    }

    const resultEntries = await supabase.from("request_supply_entries").insert(
      data.restock_supplies.map((entry: any) => ({
        request_id: result.data[0].id,
        main_supply_id: entry.mainSupplyId,
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
    return result;
  };

  const getRequests = async (props: any) => {
    const result =
      props?.roles?.role === "Sector"
        ? await supabase
            .from("requests")
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

            .from("requests")
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
    if (error) {
      return error;
    }
    return setRequestsData(data);
  };
  const getRequest = async (props: any) => {
    const result = await supabase
      .from("requests")
      .select(
        `
        id,
        sectors(*),
        remarks,
        status,
        total_price,
        request_supply_entries(*,uoms(*),supply_categories(*)),
        created_at
      `
      )
      .order("created_at", { ascending: false })
      .eq("id", props.id);
    const { data, error } = result;
    if (error) {
      return error;
    }
    return setCurrentRequestData(data);
  };
  const approveRequest = async () => {
    const result = await supabase
      .from("requests")
      .update(
        `
        
        status,
        
      `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setRequestsData(data);
  };
  const declineRequest = async () => {
    const result = await supabase
      .from("requests")
      .update(
        `
        status,
      `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setRequestsData(data);
  };

  return {
    // states
    allRequestsData,
    currentRequest,

    // methods
    createRequest,
    getRequests,
    getRequest,
    approveRequest,
    declineRequest,
  };
};
