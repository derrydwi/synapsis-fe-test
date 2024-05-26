import { getPostByIdCommentConfig, getPostByIdConfig } from "@/query/posts";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { PostDetail } from "@/components/detail/post/post-detail";

import { getQueryClient } from "@/lib/react-query";

type PostPageProps = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const queryClient = getQueryClient();

  const id = Number(params.id);

  await queryClient.prefetchQuery(getPostByIdConfig(id));
  await queryClient.prefetchQuery(getPostByIdCommentConfig(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail id={id} />
    </HydrationBoundary>
  );
}
