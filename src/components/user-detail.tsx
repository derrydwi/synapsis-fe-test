"use client";

import { useRouter } from "next/navigation";

import { useGetUserById } from "@/query/users";
import { ChevronLeft, Dot } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/utils/style";

export function UserDetail({ id }: { id: number }) {
  const userById = useGetUserById(id);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center gap-10">
      <Button
        variant="outline"
        className="w-fit gap-2"
        onClick={() => router.back()}
      >
        <ChevronLeft className="-ml-1 h-4 w-4" /> Back
      </Button>
      <div className="flex items-center justify-center gap-4">
        {userById.isLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex gap-x-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ) : userById.data?.data ? (
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="select-none uppercase">
                {userById.data?.data.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center font-medium leading-none">
                {userById.data?.data.name}
                <Dot
                  className={cn({
                    "text-emerald-600": userById.data?.data.status === "active",
                    "text-slate-200": userById.data?.data.status === "inactive",
                  })}
                />
              </span>
              <p className="text-muted-foreground">
                {userById.data?.data.email}
              </p>
              <p className="text-sm font-bold">
                {userById.data?.data.gender === "male" ? "♂" : "♀"}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
