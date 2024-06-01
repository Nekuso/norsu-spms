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
import UpdateButton from "./update-dialog";
import DeclineButton from "./decline-dialog";

export default function RequestsContent({
  dataRequest,
}: {
  dataRequest: any[];
}) {
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex justify-between place-items-center">
        <div className="w-full flex flex-col">
          <span className="text-sm font-sm">
            Request ID: {dataRequest[0].id}
          </span>
          <h1 className="text-lg font-bold">
            {dataRequest[0].sectors.sector_name}
          </h1>
        </div>
        <div className="w-fit flex place-items-center justify-end gap-2">
          {dataRequest[0].status === "Pending" && (
            <DeclineButton dataRequest={dataRequest[0]} />
          )}

          {dataRequest[0].status !== "Released" &&
            dataRequest[0].status !== "Declined" &&
            currentSession.sectors === null && (
              <UpdateButton dataRequest={dataRequest[0]} />
            )}
          <span
            className={`flex gap-3 text-sm font-semibold border rounded-full px-5 py-3 `}
          >
            Status:
            <span
              className={`text-md font-semibold ${
                dataRequest[0].status === "Pending"
                  ? "text-orange-500 border-orange-500 "
                  : dataRequest[0].status === "Approved"
                  ? "text-yellow-500 border-yellow-500 "
                  : dataRequest[0].status === "Released"
                  ? "text-green-500 border-green-500 "
                  : "text-red-500 border-red-500 "
              }`}
            >
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
      <div className="w-[40%]">
        <span className="text-sm font-semibold">Remarks:</span>
        <p className="text-sm w-full flex flex-wrap">
          {dataRequest[0].remarks}
        </p>
      </div>
    </div>
  );
}
