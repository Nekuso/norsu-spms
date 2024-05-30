import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

export default function RequestsContent({
  dataRequest,
}: {
  dataRequest: any[];
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex justify-between place-items-center">
        <div className="w-full flex flex-col">
          <span className="text-sm font-sm">
            Request ID: {dataRequest[0].id}
          </span>
          <h1 className="text-lg font-bold">
            {dataRequest[0].sectors.sector_name}
          </h1>
        </div>
        <div className="w-full flex flex-col place-items-end">
          <span className="text-sm">
            Status:{" "}
            <span className="text-md font-semibold">
              {dataRequest[0].status}
            </span>
          </span>
        </div>
      </div>
      <Table className="border rounded-xl">
        {/* <TableCaption></TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Barcode</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataRequest[0].request_supply_entries.map((supply: any) => (
            <TableRow key={supply.barcode}>
              <TableCell className="font-medium text-xs">
                {supply.barcode}
              </TableCell>
              <TableCell className=" text-xs">{supply.name}</TableCell>
              <TableCell className=" text-xs max-w-[300px] truncate">
                {supply.supply_categories.name}
              </TableCell>
              <TableCell className=" text-xs max-w-[100px] truncate">
                {supply.uoms.unit_name}
              </TableCell>
              <TableCell>x{supply.quantity}</TableCell>
              <TableCell className=" text-xs">₱ {supply.price}</TableCell>

              <TableCell className="text-right text-xs">
                ₱{" "}
                {(supply.price * supply.quantity)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="text-right">
              ₱{" "}
              {dataRequest[0].request_supply_entries
                .reduce(
                  (acc: number, supply: any) =>
                    acc + supply.price * supply.quantity,
                  0
                )
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
