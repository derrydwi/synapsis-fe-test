"use client";

import { Fragment } from "react";

import { useRouter } from "next/navigation";

import { useGetPostById, useGetPostByIdComment } from "@/query/posts";
import { useGetUserById } from "@/query/users";
import { ChevronLeft } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function PostDetail({ id }: { id: number }) {
  const postById = useGetPostById(id);
  const postByIdComment = useGetPostByIdComment(id);
  const userById = useGetUserById(Number(postById.data?.data.user_id));

  const router = useRouter();

  return (
    <div className="grid gap-8">
      <Button
        variant="outline"
        className="w-fit gap-2"
        onClick={() => router.back()}
      >
        <ChevronLeft className="-ml-1 h-4 w-4" /> Back
      </Button>
      <div className="grid gap-4">
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          {postById.data?.data.title}
        </h4>
        {userById.isLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex gap-x-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ) : userById.data?.data ? (
          <div className="flex items-baseline gap-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="select-none uppercase">
                {userById.data?.data.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <div className="flex items-center gap-x-1.5">
                <span className="font-medium leading-none">
                  {userById.data?.data.name}
                </span>
                <span className="text-muted-foreground">
                  ({userById.data?.data.email})
                </span>
              </div>
            </div>
          </div>
        ) : null}
        <p>{postById.data?.data.body}</p>
      </div>
      <Separator />
      <div className="grid gap-4">
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Comments
        </h4>
        {postByIdComment.data?.data.length ? (
          <div className="grid gap-2">
            {postByIdComment.data?.data.map((comment) => (
              <Fragment key={comment.id}>
                <div className="flex items-baseline gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="select-none uppercase">
                      {comment.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-x-1.5">
                      <span className="font-medium leading-none">
                        {comment.name}
                      </span>
                      <span className="text-muted-foreground">
                        ({comment.email})
                      </span>
                    </div>
                    <p>{comment.body}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
