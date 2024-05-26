import { getUsersConfig } from "@/query/users";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Users } from "@/components/user";

import { getQueryClient } from "@/lib/react-query";

type UsersPageProps = {
  searchParams: Record<string, string | undefined>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const queryClient = getQueryClient();

  const page = Number(searchParams.page ?? 1);
  const search = searchParams.search;

  await queryClient.prefetchQuery(getUsersConfig(page, search));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users page={page} search={search} />
    </HydrationBoundary>
  );
}
