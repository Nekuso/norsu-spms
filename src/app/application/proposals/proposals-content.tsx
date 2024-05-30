import { DataTable } from "./proposals-table/data-table";
import { initateColumns } from "./proposals-table/columns";
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
