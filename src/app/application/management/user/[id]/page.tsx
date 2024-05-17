/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import UserContent from "./user-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useEmployees } from "@/hooks/useEmployees";
import { useRoles } from "@/hooks/useRoles";
import EmployeeNotFound from "./not-found";
import Skeleton from "./skeleton";
import { useSectors } from "@/hooks/useSectors";

export default function User({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getEmployee, currentEmployeeData } = useEmployees();
  const { getRoles, allRolesData } = useRoles();
  const { getSectors, allSectorsData } = useSectors();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getEmployee(params.id, 1000);
      if (result) setError(result);
      getRoles();
      getSectors();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("employee-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "employees" },
          (payload: any) => {
            getEmployee(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      {error ? (
        <EmployeeNotFound />
      ) : currentEmployeeData.length === 0 ? (
        <Skeleton />
      ) : (
        <UserContent
          params={params}
          employee={currentEmployeeData}
          roles={allRolesData}
          sectors={allSectorsData}
        />
      )}
    </div>
  );
}
