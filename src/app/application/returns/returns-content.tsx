import { DataTable } from "./return-table/data-table";
import { initateColumns } from "./return-table/columns";
import { useSelector } from "react-redux";

export default function RequestsContent({
  dataReturns,
}: {
  dataReturns: any[];
}) {
  const sectorsSlice = useSelector((state: any) => state.sectors);

  return (
    <div className="w-full h-full">
      <DataTable columns={initateColumns(sectorsSlice)} data={dataReturns} />
    </div>
  );
}
