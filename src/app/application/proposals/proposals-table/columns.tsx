"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { allProposals } from "@/types";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
export const initateColumns = (sectors: any) => {
  const columns: ColumnDef<allProposals>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-4 z-0">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{row.original.id}</span>
            </div>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "uploaded_at",
      accessorKey: "uploaded_at",
      header: "Upload Date",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-4 z-0">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {new Date(row.original.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "file_name",
      accessorKey: "file_name",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>File Name</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-4 z-0">
            <div className="flex flex-col">
              <span className="text-sm font-semibold max-w-[250px] truncate">
                {row.original.file_name}
              </span>
            </div>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "sector",
      accessorKey: "sector",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>Sector</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      accessorFn: (row) => row.sectors.sector_name,
      cell: ({ row }) => {
        const item = sectors.find(
          (sector: any) => sector.value === row.original.sectors.sector_name
        );
        return (
          <div className="flex place-items-center gap-4 z-0">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{item?.label}</span>
            </div>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const url = row.original.file_url;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-700 rounded-full px-4 hover:bg-applicationPrimary hover:text-white hover:border-applicationPrimary transition-all duration-300 "
            href={`${url}`}
          >
            <IoMdDownload className="" style={{ marginRight: "10px" }} />{" "}
            Download
          </Link>
        );
      },
    },
  ];

  return columns;
};
