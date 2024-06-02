"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  setRequestCart,
  decrementRequestQuantity,
  incrementRequestQuantity,
} from "@/redux/slices/requestCartSlice";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type cartItem = {
  mainSupplyId: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  barcode: string;
  uom_name: string;
  uom_id: number;
  status: string;
  created_at: string;
  uoms: any;
  supply_category: number;
};

export const initiateColumns = (dispatch: any, requestOptions: any) => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between gap-4">
            <Avatar className="w-14 h-14 2xl:w-20 2xl:h-20 cursor-pointer z-0 rounded-md">
              <AvatarImage src={row.original.image} alt={row.original.image} />
              <AvatarFallback className="bg-slate-700 text-white rounded-md">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-start 2xl:py-2">
              <p className="text-md max-w-[200px] 2xl:max-w-[300px] truncate text-slate-700 font-bold flex place-items-center gap-3">
                {row.original.name}
                <p className="text-xs max-w-[120px] 2xl:max-w-[300px] truncate text-slate-500">
                  ({`${row.original.description}`})
                </p>
              </p>
              <p className="text-sm max-w-[170px] 2xl:max-w-[180px] truncate text-slate-500 font-semibold">
                {`₱ ${row.original.price} • ${row.original.uom_name}`}
              </p>
              <p className="text-sm max-w-[120px] 2xl:max-w-[300px] truncate text-slate-700">
                {`Barcode: ${row.original.barcode}`}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "quantity",
      header: () => {
        return <div className="w-full text-center">Quantity</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-4 justify-center place-items-center">
            <Button
              className="text-xs font-bold rounded-md group flex gap-2 hover:text-white transition-all duration-300 px-4 py-2 cursor-pointer bg-transparent hover:bg-applicationPrimary border border-lightBorder hover:border-transparent"
              type="button"
              onClick={() => {
                dispatch(decrementRequestQuantity(row.original.barcode));
              }}
            >
              <FaMinus className="text-slate-400 group-hover:text-white" />
            </Button>
            <Input
              className="text-slate-700 font-bold text-center w-16"
              type="number"
              value={row.original.quantity}
              onChange={(e) => {
                dispatch(
                  setRequestCart({
                    barcode: row.original.barcode,
                    quantity: e.target.value,
                  })
                );
              }}
            ></Input>
            <Button
              className="text-xs font-bold rounded-md group flex gap-2 hover:text-white transition-all duration-300 px-4 py-2 cursor-pointer bg-transparent hover:bg-applicationPrimary border border-lightBorder hover:border-transparent"
              type="button"
              disabled={
                requestOptions.find(
                  (option: any) => option.barcode === row.original.barcode
                ).supply_quantity <= 0
              }
              onClick={() => {
                dispatch(incrementRequestQuantity(row.original.barcode));
              }}
            >
              <FaPlus className="text-slate-400 group-hover:text-white" />
            </Button>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return <div className="w-full text-right">Total</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex min-w-[150px] gap-2 justify-end text-slate-700 font-bold">
            ₱{" "}
            {(row.original.price * row.original.quantity)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        );
      },
    },
  ];
  return columns;
};
