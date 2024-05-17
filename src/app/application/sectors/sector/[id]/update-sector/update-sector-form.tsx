import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

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
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useSectors } from "@/hooks/useSectors";
import SectorTypeInput from "./sector-type-input";

export default function SectorForm({ setDialogOpen, sector }: any) {
  const [isPending, startTransition] = useTransition();
  const { updateSector } = useSectors();
  const sectorScheema = z.object({
    id: z.number(),
    sector_name: z.string().min(3, "Name is too short"),
    sector_type: z.string().min(1, "Sector is required"),
    description: z.string().min(3, "Description is too short"),
  });
  const form = useForm<z.infer<typeof sectorScheema>>({
    resolver: zodResolver(sectorScheema),
    defaultValues: {
      id: sector.id,
      sector_name: sector.sector_name,
      sector_type: sector.sector_type,
      description: sector.description,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await updateSector(data, 1500);
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }
      sonner("Success", {
        description: `Sector Updated`,
      });
      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <FormField
              control={form.control}
              name="sector_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Sector Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      {...field}
                      type="text"
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <FormField
              control={form.control}
              name="sector_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Sector Type</FormLabel>
                  <SectorTypeInput data={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Description</FormLabel>
                  <Textarea
                    className="bg-lightComponentBg border-slate-600/50 w-full h-[100px] resize-none"
                    placeholder="Description"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-md min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary hover:bg-applicationPrimary/90 primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Update Sector</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
