"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import AddDepartmentButton from "./add-sector/add-sector-dialog";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { sectorTypes } from "./columns";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const sectorsSlice = useSelector((state: any) => state.sectors);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="w-[250px] h-10 border rounded-lg"
          placeholder="Find Sectors"
          value={
            (table.getColumn("sector_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("sector_name")?.setFilterValue(event.target.value)
          }
        />
        {table.getColumn("sector_type") && (
          <DataTableFacetedFilter
            column={table.getColumn("sector_type")}
            title="Sectors"
            options={sectorTypes}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 hover:bg-applicationPrimary hover:text-white"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        <AddDepartmentButton />
      </div>
    </div>
  );
}
