import { DataTable } from "./employees-table/data-table";
import { initateColumns } from "./employees-table/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDisplay } from "@/types";
import { useSelector } from "react-redux";

export default function ManagementContent({
  dataEmployees,
}: {
  dataEmployees: EmployeeDisplay[];
}) {
  const sectorsSlice = useSelector((state: any) => state.sectors);
  const rolesSlice = useSelector((state: any) => state.roles);

  return (
    <div className="w-full h-full">
      {dataEmployees.length === 0 ? (
        "Fetching Data..."
      ) : (
        <DataTable
          columns={initateColumns(sectorsSlice, rolesSlice)}
          data={dataEmployees}
        />
      )}
    </div>
  );
}
