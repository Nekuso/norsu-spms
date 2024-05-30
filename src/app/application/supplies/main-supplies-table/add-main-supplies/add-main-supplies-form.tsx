"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DataTable as MainSuppliesCart } from "./add-main-supplies-cart/main-supplies-cart/data-table";

import { initiateColumns as initiateMainSuppliesCartColumns } from "./add-main-supplies-cart/main-supplies-cart/columns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useEffect, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useMainSupplies } from "@/hooks/useMainSupplies";
import { useSelector } from "react-redux";
import MainSuppliesCartOptions from "./add-main-supplies-table/lists";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/slices/mainSuppliesCartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function OrderForm({ setDialogOpen }: any) {
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );
  const [isPending, startTransition] = useTransition();
  const { updateMainSupplies } = useMainSupplies();
  const dispatch = useDispatch();
  const router = useRouter();

  const mainSuppliesCart = useSelector(
    (state: any) => state.mainSuppliesCart.mainSuppliesCart
  );
  const mainSuppliesOptions = useSelector((state: any) => state.mainSupplies);

  const mainSupplySchema: any = z.object({
    employee_id: z.string(),
    total_price: z.coerce.number().nullable().default(0),
    restock_supplies: z.array(
      z.object({
        mainSupplyId: z.coerce.number(),
        supply_category: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        barcode: z.string(),
        uom_name: z.string(),
        uom_id: z.coerce.number(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
      })
    ),
  });
  const form = useForm<z.infer<typeof mainSupplySchema>>({
    resolver: zodResolver(mainSupplySchema),
    defaultValues: {
      employee_id: currentSession.id,
      total_price: 0,
    },
  });

  form.setValue("restock_supplies", mainSuppliesCart);
  useEffect(() => {
    form.setValue(
      "total_price",
      mainSuppliesCart.reduce(
        (acc: any, supply: any) => acc + supply.price * supply.quantity,
        0
      )
    );
  }, [mainSuppliesCart]);

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await updateMainSupplies(data, 500);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }
      setDialogOpen(false);
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        dispatch(resetCart());
      });
    });
  }

  function onCancel() {
    dispatch(resetCart());
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-4">
          <div className="w-[60%] 2xl:w-[50%] h-full rounded-lg overflow-hidden">
            <MainSuppliesCartOptions />
          </div>
          <ScrollArea className="w-full h-[553px] 2xl:h-[657px] flex flex-col justify-between bg-white rounded-lg border border-lightBorder p-0 px-4 gap-0 relative">
            <div className="w-full h-full flex flex-col gap-6 justify-between relative">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                defaultValue={["item-1"]}
              >
                {mainSuppliesCart.length > 0 && (
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                      Supplies Summary
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <MainSuppliesCart
                        columns={initiateMainSuppliesCartColumns(
                          dispatch,
                          mainSuppliesOptions
                        )}
                        data={mainSuppliesCart}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
              <div className="w-full py-6 flex gap-8 position sticky bottom-[-4px] bg-white m-0 text-lg font-bold">
                <span className="w-full text-end">Total</span>
                <span className="w-[20%] text-end">{`₱ ${mainSuppliesCart
                  .reduce(
                    (acc: any, supply: any) =>
                      acc + supply.price * supply.quantity,
                    0
                  )
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 text-red-500 bg-transparent hover:bg-transparent"
            onClick={() => onCancel()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
            disabled={
              mainSuppliesCart.length === 0 && mainSuppliesCart.length === 0
                ? true
                : false
            }
          >
            <span className={cn({ hidden: isPending })}>Submit</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
