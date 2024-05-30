import { DataTable } from "./main-supplies-table/data-table";
import { initialState as initateColumns } from "./main-supplies-table/columns";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/layout/loading/loader";

export default function SupplyContent({ dataStocks }: { dataStocks: any[] }) {
  const uomsSlice = useSelector((state: any) => state.uoms);
  const supplyCategoriesSlice = useSelector(
    (state: any) => state.supplyCategories
  );
  return (
    <div className="w-full h-full">
      {dataStocks.length === 0 ? (
        <LoadingPage />
      ) : (
        <DataTable
          columns={initateColumns(uomsSlice, supplyCategoriesSlice)}
          data={dataStocks}
        />
      )}
    </div>
  );
}
