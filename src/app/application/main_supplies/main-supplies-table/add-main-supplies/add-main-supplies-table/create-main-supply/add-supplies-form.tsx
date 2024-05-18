"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TbCurrencyPeso } from "react-icons/tb";

import UomInput from "./uom-input";
import CategoryInput from "./category-input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import ImageInput from "./image-input";
import { useEffect, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { addMainSuppliesToCart } from "@/redux/slices/mainSuppliesCartSlice";
import { useSelector } from "react-redux";

export const suppliesSchema = z.object({
  mainSupplyId: z.coerce.number().nullable().default(null),
  name: z.string().min(1, {
    message: "Supply name is required",
  }),
  description: z.string().min(1, {
    message: "Supply description is required",
  }),
  image: z.string().default("something"),
  barcode: z.string().min(1, {
    message: "Supply barcode is required",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Supply quantity must be at least 1",
  }),
  price: z.coerce.number().min(1, {
    message: "Supply price is required",
  }),
  uom_id: z
    .string()
    .min(1, {
      message: "Supply uom id is required",
    })
    .transform((arg) => new Number(arg)),
  uom_name: z.string().min(1, {
    message: "Supply uom name is required",
  }),
  supply_category: z
    .string()
    .min(1, {
      message: "Supply uom id is required",
    })
    .transform((arg) => new Number(arg)),
  status: z
    .string()
    .min(1, {
      message: "Supply status is required",
    })
    .default("Available"),
});

export default function SupplyForm({ dispatch }: any) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof suppliesSchema>>({
    resolver: zodResolver(suppliesSchema),
    defaultValues: {
      mainSupplyId: null,
      quantity: 1,
      price: 0.0,
      status: "Available",
    },
  });

  const uomsData = useSelector((state: any) => state.uoms);

  useEffect(() => {
    // if uom_id has value then set get the uom_name
    if (form.getValues("uom_id")) {
      const uom = uomsData.find(
        (uom: any) => uom.id === Number(form.getValues("uom_id"))
      );
      form.setValue("uom_name", uom.value);
    }
  }, [form.getValues("uom_id")]);

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  function onSubmit(data: any) {
    dispatch(addMainSuppliesToCart(data));
    form.setValue("mainSupplyId", null);
    form.setValue("name", "");
    form.setValue("description", "");
    form.setValue("image", "");
    form.setValue("barcode", "");
    form.setValue("quantity", 1);
    form.setValue("price", 0.0);
    form.setValue("status", "Available");
    form.reset();
    sonner("ADDED", {
      description: `Supply added to Cart!`,
    });
  }

  return (
    <Form {...form}>
      <form className="flex h-full flex-col justify-between gap-5 p-4">
        <div className="w-full flex flex-col min-h-[300px]">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full flex justify-center place-items-center gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="h-fit">
                    <FormControl>
                      <ImageInput data={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex flex-col">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Supply Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-lg  border-slate-600/50"
                            {...field}
                            type="text"
                            placeholder="Supply name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-4">
                  <div className="w-full flex flex-col ">
                    <FormField
                      control={form.control}
                      name="uom_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Unit of Measure
                          </FormLabel>
                          <FormControl>
                            <UomInput data={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Price</FormLabel>
                      <div className="w-full flex place-items-center rounded-lg border border-slate-600/50 ">
                        <div className="h-full px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
                          <TbCurrencyPeso className="h-full w-5 text-center" />
                        </div>
                        <FormControl>
                          <Input
                            className="w-full text-start bg-transparent border-none rounded-tr-lg rounded-br-lg"
                            {...field}
                            type="number"
                            placeholder="0.00"
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col ">
                <FormField
                  control={form.control}
                  name="supply_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Category</FormLabel>
                      <FormControl>
                        <CategoryInput data={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full ">
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Barcode</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg  border-slate-600/50"
                        {...field}
                        type="text"
                        placeholder="Enter Barcode"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <Textarea
                      className=" border-slate-600/50 w-full h-full resize-none"
                      placeholder="Description"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="button"
            onClick={form.handleSubmit(onSubmit)}
          >
            <span className={cn({ hidden: isPending })}>Add</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}
