import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { useState } from "react";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const useEmployees: any = () => {
  const [allEmployeesData, setAllEmployeesData] = useState<EmployeeDisplay[]>(
    []
  );
  const [currentEmployeeData, setCurrentEmployeeData] = useState<any>([]);

  const createEmployee = async (props: any, duration: number = 1000) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s3",
        },
      }
    );

    const result = await supabase.auth.signUp({
      email: props.email,
      password: props.password,
      options: {
        data: {
          first_name: props.first_name,
          last_name: props.last_name,
          image_url: props.image_url,
          address: props.address,
          role: props.role,
          sector: props.sector,
          password: props.password,
        },
      },
    });
    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const getEmployees = async () => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
      .from("employees")
      .select(
        `
      id,
      email,
      first_name,
      last_name,
      image_url,
      sectors (
        *
      ),
      address,
      roles (id, role),
      password
    `
      )
      .order("created_at", { ascending: false });
    type EmployeesWithJoin = QueryData<typeof result>;

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return setAllEmployeesData(data as EmployeesWithJoin);
  };
  const getEmployee = async (id: string, duration?: number) => {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("employees")
      .select(
        `
      id,
      email,
      first_name,
      last_name,
      image_url,
      sectors (
        *
      ),
      address,
      roles (id, role),
      password
    `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentEmployeeData(data);
  };
  const updateEmployee = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s10",
        },
      }
    );
    const result = await supabase.auth.admin.updateUserById(props.id, {
      email: props.email,
      password: props.password,
      user_metadata: {
        first_name: props.first_name,
        last_name: props.last_name,
        image_url: props.image_url,
        address: props.address,
        role: props.role,
        sector: props.sector,
        password: props.password,
      },
    });
    console.log(props);
    console.log(result);
    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteEmployee = async (props: any, duration?: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.auth.admin.deleteUser(props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // data
    allEmployeesData,
    currentEmployeeData,

    // methods
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
  };
};
