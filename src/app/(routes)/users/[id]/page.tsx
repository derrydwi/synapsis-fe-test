import { getUserByIdConfig } from "@/query/users";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { UserDetail } from "@/components/detail/user/user-detail";

import { getQueryClient } from "@/lib/react-query";

type UserPageProps = {
  params: {
    id: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const queryClient = getQueryClient();

  const id = Number(params.id);

  await queryClient.prefetchQuery(getUserByIdConfig(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDetail id={id} />
    </HydrationBoundary>
  );
}
