import { QueryData, createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useProposals: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allProposalsData, setAllProposalsData] = useState<any>([]);
  const [currentSectorData, setCurrentSectorData] = useState<any>([]);

  const createProposal = async (props: any, duration?: any) => {
    console.log(props.file[0]);
    const fileResult = await supabase.storage
      .from("files")
      .upload(props.file[0].name, props.file[0]);
    console.log(fileResult);

    if (fileResult.error) {
      return fileResult;
    }
    const result = await supabase.from("proposals").insert({
      sector_id: props.sector_id,
      file_url: `https://mhwrqfiqmclqpmsignid.supabase.co/storage/v1/object/public/files/${props.file[0].name}`,
      file_name: props.file[0].name,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getProposals = async (props?: any) => {
    const result =
      props?.roles?.role === "Sector"
        ? await supabase
            .from("proposals")
            .select(
              `
              id,
              file_name,
              file_url,
              sectors(*),
              created_at
            `
            )
            .eq("sector_id", props?.sectors?.id)
        : await supabase.from("proposals").select(`
      id,
      file_name,
      file_url,
      sectors(*),
      created_at
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }
    setAllProposalsData(data);
    return result;
  };
  const getProposal = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("proposals")
      .select(
        `
        id,
        file_name,
        file_url,
        sectors(*),
        created_at
      `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentSectorData(data);
  };
  const deleteProposal = async (props: any, duration?: number) => {
    const result = await supabase.from("proposals").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allProposalsData,
    currentSectorData,

    // methods
    createProposal,
    getProposals,
    getProposal,
    deleteProposal,
  };
};
