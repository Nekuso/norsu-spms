import { QueryData, createClient } from "@supabase/supabase-js";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const useProgress: any = () => {
  const supabase = createSupabaseBrowserClient();

  const updateProgress = async (props: any, duration?: number) => {
    const result = await supabase
      .from("requests")
      .update({
        status: props.status,
      })
      .eq("id", props.id)
      .select();

    if (props.status === "Released") {
      const upsertResult = await supabase.rpc("upsertmainsupplies", {
        sector_id: props.sector_id,
        request_supply_entries: props.request_supply_entries,
      });

      console.log(upsertResult);
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    console.log(props);

    return result;
  };

  const declineRequest = async (props: any, duration?: number) => {
    const result = await supabase
      .from("requests")
      .update({
        status: "Declined",
        remarks: props.remarks,
      })
      .eq("id", props.id)
      .select();

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  return {
    // methods
    updateProgress,
    declineRequest,
  };
};
