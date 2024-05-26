"use client";

import { useRouter } from "next/navigation";

import { useGetPosts } from "@/query/posts";

import { PostCard } from "@/components/card/post/post-card";
import { Pagination } from "@/components/pagination/pagination";

type PostsProps = {
  page: number;
};

export function Posts({ page }: PostsProps) {
  const posts = useGetPosts(page);
  const router = useRouter();

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {posts.data?.data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-end">
        <Pagination
          forcePage={page - 1}
          pageCount={Number(posts.data?.meta.pages)}
          onPageChange={(page) => router.push(`?page=${page.selected + 1}`)}
        />
      </div>
    </>
  );
}
