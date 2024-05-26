import { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/navigation";

import { useCreateUser, useUpdateUserById } from "@/mutations/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { User, userSchema } from "@/utils/validations/users";

import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "./ui/use-toast";

type FormUserProps = {
  user?: User | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function FormUser({ user, setOpen }: FormUserProps) {
  const createUser = useCreateUser();
  const updateUserById = useUpdateUserById();

  const router = useRouter();

  const form = useForm<User>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      gender: user?.gender,
      status: user?.status,
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    const body = new FormData();

    for (const key in data) {
      body.append(key, data[key as keyof typeof data] as any);
    }

    if (user) {
      updateUserById.mutate(
        { id: user?.id as number, body },
        {
          onSuccess: () => {
            toast({
              title: "User updated",
            });
            setOpen((prev) => !prev);
            router.refresh();
          },
          onError: (error) => {
            toast({
              title: "Failed to update user",
              variant: "destructive",
              description: (error as FetchError)?.data?.message,
            });
          },
        },
      );
    } else {
      createUser.mutate(
        { body },
        {
          onSuccess: () => {
            toast({
              title: "User created",
            });
            setOpen((prev) => !prev);
            router.refresh();
          },
          onError: (error) => {
            toast({
              title: "Failed to create user",
              variant: "destructive",
              description: (error as FetchError)?.data?.message,
            });
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Insert name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Insert email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">Active</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="inactive" />
                    </FormControl>
                    <FormLabel className="font-normal">Inactive</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
