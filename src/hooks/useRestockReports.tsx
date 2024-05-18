import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useRestockReports: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allRestockReportsData, setRestockReportsData] = useState<any>([]);
  const [currentRestockReport, setRestockReportData] = useState<any>([]);

  const getRestockReports = async () => {
    const result = await supabase
      .from("restock_reports")
      .select(
        `
        id,
        employees(*),
        total_price,
        restock_report_entries(*),
        created_at
      `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setRestockReportsData(data);
  };
  const getRestockReport = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("restock_reports")
      .select(
        `
        id,
        employees(*,roles(*)),
        total_price,
        restock_report_entries(*),
        created_at
      `
      )
      .eq("id", id);
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setRestockReportData(data);
  };

  return {
    // states
    allRestockReportsData,
    currentRestockReport,

    // methods
    getRestockReport,
    getRestockReports,
  };
};
