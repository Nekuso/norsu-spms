import Image from "next/image";
import ReportLogo from "@/images/report-logo.png";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaFilePdf } from "react-icons/fa6";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

export default function UserContent({ restockReport }: any) {
  const targetRef = useRef<any>();
  const options: Options = {
    filename: "RestockReport.pdf",
    // default is `save`
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.NORMAL,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
    },
    // customize any value passed to the jsPDF instance and html2canvas
    // function
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
    },
  };

  return (
    <div className="w-full min-h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-7 py-4 ">
      <div className="w-fit h-fit relative">
        <Button
          className="absolute top-0 left-[105%] flex gap-2"
          onClick={() => generatePDF(targetRef, options)}
        >
          <FaFilePdf /> Download PDF
        </Button>
        <div
          className="w-[806px] min-h-[1140px] flex flex-col place-items-center bg-white p-8 gap-2"
          ref={targetRef}
        >
          <div className="w-full h-fit flex flex-col place-items-center gap-2">
            <Image src={ReportLogo} alt="Report Logo" className="w-[70%]" />
            <h1 className="text-md font-bold w-full text-center">
              SUPPLY AND PROPERTY MANAGEMENT OFFICE
            </h1>
            <h1 className="text-lg font-bold w-full text-center">
              Restock Report
            </h1>
            <Table className="h-full border ">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Supply Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restockReport[0].restock_report_entries.map((supply: any) => (
                  <TableRow key={supply.barcode}>
                    <TableCell className="font-medium text-xs">
                      {supply.barcode}
                    </TableCell>
                    <TableCell className=" text-xs">{supply.name}</TableCell>
                    <TableCell className=" text-xs max-w-[100px] truncate">
                      {supply.uoms.unit_name}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      x{supply.supply_quantity}
                    </TableCell>
                    <TableCell className=" text-xs">₱ {supply.price}</TableCell>

                    <TableCell className="text-right text-xs">
                      ₱{" "}
                      {(supply.price * supply.supply_quantity)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="text-end" colSpan={5}>
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ₱
                    {restockReport[0].restock_report_entries
                      .reduce(
                        (acc: any, supply: any) =>
                          acc + supply.price * supply.supply_quantity,
                        0
                      )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <div className="w-full py-11 ">
            <div className="flex flex-col gap-8">
              <h1 className="text-sm font-bold">Prepared by:</h1>
              <h1 className="w-fit flex flex-col justify-center place-items-center ml-6">
                <span className="text-center w-full ">Glenn D. Lumjod</span>
                <span className="font-bold">Property Supply Officer </span>
              </h1>
            </div>
          </div>
          <div className="w-full py-10 ">
            <h1 className="text-lg font-bold">
              Created at:{" "}
              <span className="underline">
                {new Date(restockReport[0].created_at).toDateString()}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
