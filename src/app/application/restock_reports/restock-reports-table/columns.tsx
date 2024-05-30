"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { allRestockReportsDisplay } from "@/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const statuses = [
  {
    value: "Available",
    label: "Available",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Low Stock",
    label: "Low Stock",
    icon: CircleIcon,
  },
  {
    value: "Out Of Stock",
    label: "Out Of Stock",
    icon: CheckCircledIcon,
  },
];

export const initialState = (uoms?: any, supply_categories?: any) => {
  const columns: ColumnDef<allRestockReportsDisplay>[] = [
    {
      id: "id",
      accessorKey: "id",
      accessorFn: (row) => row.id,
      header: "ID",
      cell: ({ row }) => {
        return <p className="text-sm">{row.original.id}</p>;
      },
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>Created at</span>
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
        return format(row.original.created_at, "PPPP");
      },
    },
    {
      id: "Processed By",
      accessorKey: "employee_id",
      header: "Processed By",
      cell: ({ row }) => {
        return (
          <p className="text-sm">
            {row.original.employees?.first_name}{" "}
            {row.original.employees.last_name}
          </p>
        );
      },
    },
    {
      id: "total_price",
      accessorKey: "total_price",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>Total Price</span>
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
          <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-bold">
            ₱{" "}
            {row.original.total_price
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-md px-4 hover:bg-applicationPrimary hover:text-white hover:border-applicationPrimary transition-all duration-300 primary-glow"
            href={`/application/restock_reports/${id}`}
          >
            View
          </Link>
        );
      },
    },
  ];
  return columns;
};
