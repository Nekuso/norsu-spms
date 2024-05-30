import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { DataTable as SuppliesOptionsDataTable } from "./main-supplies-options/data-table";
import { initiateColumns as initiateMainSuppliesColumns } from "./main-supplies-options/columns";
import { useSelector, useDispatch } from "react-redux";
import CreateMainSupplies from "./create-main-supply/add-supplies-form";

export default function OrderCartOptions({}: {}) {
  const mainSuppliesOption = useSelector((state: any) => state.mainSupplies);
  const mainSuppliesCart = useSelector(
    (state: any) => state.mainSuppliesCart.mainSuppliesCart
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
          <TabsTrigger
            value="new"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/60
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <BsBoxSeam />
            New
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="supplies"
        className="w-full h-full bg-white border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <SuppliesOptionsDataTable
          columns={initiateMainSuppliesColumns(dispatch, mainSuppliesCart)}
          data={mainSuppliesOption}
        />
      </TabsContent>
      <TabsContent
        value="new"
        className="w-full h-full bg-white border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <CreateMainSupplies dispatch={dispatch} />
      </TabsContent>
    </Tabs>
  );
}
