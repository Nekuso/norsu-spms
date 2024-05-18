import { DataTable } from "./restock-reports-table/data-table";
import { initialState as initateColumns } from "./restock-reports-table/columns";

export default function ReportsContent({
  dataRestockReports,
}: {
  dataRestockReports: any[];
}) {
  return (
    <div className="w-full h-full">
      {dataRestockReports.length === 0 ? (
        "Fetching Data..."
      ) : (
        <DataTable columns={initateColumns()} data={dataRestockReports} />
      )}
    </div>
  );
}
