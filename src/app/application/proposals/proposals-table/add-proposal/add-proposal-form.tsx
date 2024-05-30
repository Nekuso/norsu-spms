"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useProposals } from "@/hooks/useProposals";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function OrderForm({ setDialogOpen }: any) {
  const currentSession = useSelector(
    (state: any) => state.currentSession.currentSession
  );

  console.log(currentSession);

  const [isPending, startTransition] = useTransition();
  const { createProposal } = useProposals();
  const formSchema = z.object({
    sector_id: z.number().min(1),
    file: z.instanceof(FileList).refine((value) => value.length === 1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector_id: currentSession.sectors.id,
    },
  });

  const fileRef = form.register("file");

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createProposal(data, 500);

      console.log(result);
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }

      console.log(data);
      setDialogOpen(false);
      toast({
        title: "Success",
        description: "Proposal uploaded successfully",
      });
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {});
    });
  }

  function onCancel() {
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input type="file" placeholder="shadcn" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
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
