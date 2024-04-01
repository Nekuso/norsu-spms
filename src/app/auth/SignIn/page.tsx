"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import loginLogo from "@/images/login-logo.png";
import loginIllustration from "@/images/login-illustration.png";
import React, { useTransition } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/components/ui/input";
import { toast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { signInWithEmailAndPassword } from "@/lib/actions/index";
import { redirect } from "next/navigation";
import { cn } from "@nextui-org/react";

const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function SignIn() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data);

      const { error } = JSON.parse(result);
      if (error?.message) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else
        toast({
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Login Successful</code>
            </pre>
          ),
        });
      return redirect("/application");
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <main className="w-screen bg-[url('../images/bg-left.png')] bg-cover bg-no-repeat h-screen grid grid-cols-2">
        <div className="w-[85%] h-full  flex flex-col justify-center place-items-center ">
          <Image src={loginLogo} alt="norsu-logo" />
          <Image src={loginIllustration} alt="login-illustration" />
          <div className="flex flex-col justify-items-center place-items-center gap-2">
            <h1 className="text-center text-white text-3xl font-bold">
              Managing Supply made easy!
            </h1>
            <p className="text-center text-white text-xl">
              This is a Capstone project of group 20
            </p>
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center place-items-center">
          <div className="w-[50%] h-auto rounded-xl mx-8 my-8 bg-white">
            <h1 className="text-center  text-slate-800 text-3xl font-bold">
              Login
            </h1>

            <FormProvider {...form}>
              <div className="w-full py-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          {...field}
                          type="email"
                          onChange={field.onChange}
                          className="border-b-2 text-black rounded-3xl  p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full py-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          type="password"
                          onChange={field.onChange}
                          className="border-b-2 text-black   rounded-3xl  p-4"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormProvider>
            <div className="w-full py-2 flex flex-col gap-2">
              <Button
                type="submit"
                className="text-lg px-10 py-2  rounded-full text-white bg-[#17134E]"
              >
                Submit &nbsp;
                <AiOutlineLoading3Quarters
                  className={cn(" animate-spin", { hidden: !isPending })}
                />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
