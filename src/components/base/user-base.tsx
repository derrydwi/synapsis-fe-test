"use client";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useGetUsers } from "@/query/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, SearchIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { UserCard } from "@/components/card/user/user-card";
import { Pagination } from "@/components/pagination/pagination";

import { updateSearchParams } from "@/utils/helpers";
import { Search, searchSchema } from "@/utils/validations/search";

import { UserForm } from "../form/user-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type UsersProps = {
  page: number;
  search?: string | undefined;
};

export function Users({ page, search }: UsersProps) {
  const users = useGetUsers(page, search);
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<Search>({
    values: {
      search: search as string,
    },
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<Search> = (data) => {
    router.push(
      `${pathname}?${updateSearchParams({ search: data.search, page: null })}`,
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit gap-2">
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
            </DialogHeader>
            <UserForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="flex flex-1 items-center gap-1 space-y-0">
                  <FormControl>
                    <Input
                      placeholder="Search by name or email"
                      {...field}
                      className="w-fit"
                    />
                  </FormControl>
                  <Button variant="outline">
                    <SearchIcon />
                    <span className="sr-only">Search</span>
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {users.data?.data?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          forcePage={page - 1}
          pageCount={Number(users.data?.meta.pages)}
          onPageChange={(page) =>
            router.push(
              `?page=${page.selected + 1}${search ? `&search=${search}` : ""}`,
            )
          }
        />
      </div>
    </>
  );
}
