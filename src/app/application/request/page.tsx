"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Tasks from "./data/tasks.json";

export default function Transactions() {
  return (
    <div className="relative  overflow-auto card  text-black px-4 bg-white py-12    ">
      <div className="w-full h-full flex">
        <DataTable columns={columns} data={Tasks} />
      </div>
    </div>
  );
}
