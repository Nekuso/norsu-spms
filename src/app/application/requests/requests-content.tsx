import { DataTable } from "./requests-table/data-table";
import { initateColumns } from "./requests-table/columns";
import { useSelector } from "react-redux";

export default function RequestsContent({
  dataRequests,
}: {
  dataRequests: any[];
}) {
  const sectorsSlice = useSelector((state: any) => state.sectors);

  return (
    <div className="w-full h-full">
      <DataTable columns={initateColumns(sectorsSlice)} data={dataRequests} />
    </div>
  );
}
