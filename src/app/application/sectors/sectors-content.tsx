import { DataTable } from "./sectors-table/data-table";
import { initateColumns } from "./sectors-table/columns";
import { useSelector } from "react-redux";

export default function DepartmentContent({
  dataSectors,
}: {
  dataSectors: any[];
}) {
  const sectorsSlice = useSelector((state: any) => state.sectors);

  return (
    <div className="w-full h-full">
      {dataSectors.length === 0 ? (
        "Fetching Data..."
      ) : (
        <DataTable
          columns={initateColumns(sectorsSlice)}
          data={dataSectors}
        />
      )}
    </div>
  );
}
