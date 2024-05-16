import { DataTable } from "./supplies-table/data-table";
import { initialState as initateColumns } from "./supplies-table/columns";
import { useSelector } from "react-redux";

export default function SupplyContent
({
  dataStocks,
}: {
  dataStocks: any[];
}) {
  const uomsSlice = useSelector((state: any) => state.uoms);
  console.log(dataStocks);
  return (
    <div className="w-full h-full">
      {dataStocks.length === 0 ? (
        "Fetching Data..."
      ) : (
        <DataTable columns={initateColumns(uomsSlice)} data={dataStocks} />
      )}
    </div>
  );
}
