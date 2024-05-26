"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useDeleteUserById } from "@/mutations/users";
import { Dot, MoreHorizontal } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/utils/style";
import { User } from "@/utils/validations/users";

import { FormUser } from "./form-user";
import { PropagationStopper } from "./propagation-stopper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "./ui/use-toast";

type UserCardProps = {
  user: User | undefined;
};

export function UserCard({ user }: UserCardProps) {
  const router = useRouter();

  const deleteUserById = useDeleteUserById();

  const [open, setOpen] = useState(false);

  const handleDeleteUser = () => {
    deleteUserById.mutate(
      { id: user?.id as number },
      {
        onSuccess: () => {
          toast({
            title: "User deleted",
          });
          router.refresh();
        },
        onError: (error) => {
          toast({
            title: "Failed to delete user",
            variant: "destructive",
            description: (error as FetchError)?.data?.message,
          });
        },
      },
    );
  };

  if (!user) return null;

  return (
    <>
      <Link href={`/users/${user.id?.toString()}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <p className="line-clamp-1">{user.name}</p>
                <Dot
                  className={cn({
                    "text-emerald-600": user.status === "active",
                    "text-slate-200": user.status === "inactive",
                  })}
                />
                <p className="text-xs">
                  {user.gender === "male" ? "♂" : "♀"}
                </p>
              </div>
              <PropagationStopper>
                <Dialog open={open} onOpenChange={setOpen}>
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DialogTrigger asChild>
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem>Delete user</DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <FormUser user={user} setOpen={setOpen} />
                    </DialogContent>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Dialog>
              </PropagationStopper>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 break-all">{user.email}</p>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
