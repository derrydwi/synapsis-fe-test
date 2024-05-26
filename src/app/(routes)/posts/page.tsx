import { getPostsConfig } from "@/query/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Posts } from "@/components/base/post-base";

import { getQueryClient } from "@/lib/react-query";

type PostsPageProps = {
  searchParams: Record<string, string | undefined>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const queryClient = getQueryClient();

  const page = Number(searchParams.page ?? 1);

  await queryClient.prefetchQuery(getPostsConfig(page));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts page={page} />
    </HydrationBoundary>
  );
}
