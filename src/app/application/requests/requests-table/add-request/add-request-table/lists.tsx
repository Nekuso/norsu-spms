import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsBoxSeam } from "react-icons/bs";
import { DataTable as SuppliesOptionsDataTable } from "./request-options/data-table";
import { initiateColumns as initiateMainSuppliesColumns } from "./request-options/columns";
import { useSelector, useDispatch } from "react-redux";

export default function OrderCartOptions({}: {}) {
  const mainSuppliesOption = useSelector(
    (state: any) => state.request.requestOptions
  );
  const requestCart = useSelector(
    (state: any) => state.requestCart.requestCart
  );
  const dispatch = useDispatch();

  return (
    <Tabs
      defaultValue="supplies"
      className="w-full h-full flex max-w-[1840px] flex-col justify-center place-items-center gap-1"
    >
      <div className="w-full flex justify-between">
        <TabsList className="h-fit bg-darkBg border border-lightBorder rounded-lg gap-2">
          <TabsTrigger
            value="supplies"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/60
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <BsBoxSeam />
            Supplies
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="supplies"
        className="w-full h-full bg-white border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <SuppliesOptionsDataTable
          columns={initiateMainSuppliesColumns(dispatch, requestCart)}
          data={mainSuppliesOption}
        />
      </TabsContent>
    </Tabs>
  );
}
