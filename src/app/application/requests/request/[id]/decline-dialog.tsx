"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrNext } from "react-icons/gr";

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
import { useProgress } from "@/hooks/useProgress";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateStatus({ dataRequest }: any) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { declineRequest } = useProgress();

  const desclineSchema = z.object({
    id: z.coerce.number(),
    remarks: z
      .string()
      .min(10, { message: "Remarks must be at least 10 characters" }),
  });

  const form = useForm<z.infer<typeof desclineSchema>>({
    resolver: zodResolver(desclineSchema),
    defaultValues: {
      id: dataRequest.id,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await declineRequest(
        { ...data, status: "Declined" },
        1000
      );
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: error.message,
        });
        return;
      }
      setDialogIsOpen(false);
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="text-xs font-bold rounded-md flex gap-2 transition-all duration-300"
          onClick={() => setDialogIsOpen(true)}
        >
          <span className="flex justify-center place-items-center gap-2">
            Decline <GrNext />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]  border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Decline</DialogTitle>
          <DialogDescription>
            Are you sure you want to decline this request?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full py-5">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        title="remarks"
                        placeholder="Enter Remarks"
                        className="w-full text-sm px-2.5 py-2.5 rounded-md bg-foregroundBg text-black border border-lightBorder "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex gap-4 justify-center place-items-center">
              <span
                className="text-xs font-bold text-muted-foreground cursor-pointer hover:underline transition-all duration-300"
                onClick={() => setDialogIsOpen(false)}
              >
                Cancel
              </span>

              <Button
                variant={"destructive"}
                className="text-xs font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300 "
              >
                <span
                  className={cn(
                    "flex gap-2 place-items-center justify-center",
                    {
                      hidden: isPending,
                    }
                  )}
                >
                  Decline
                </span>
                <AiOutlineLoading3Quarters
                  className={cn(" animate-spin", { hidden: !isPending })}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
