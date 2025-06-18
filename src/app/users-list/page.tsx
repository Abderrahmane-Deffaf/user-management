import { userSearchParamsCache } from "@/modules/user-management/api/get-user-search-params";
import UsersMainScreen from "@/modules/user-management/user-screens/users-main-screen";
import { NuqsAdapter } from "nuqs/adapters/next";

type UserSearchParams = {
  search?: string;
  page?: string;
  limit?: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<UserSearchParams>;
}) {
  await userSearchParamsCache.parse(searchParams);
  return (
    <NuqsAdapter>
      <UsersMainScreen />
    </NuqsAdapter>
  );
}
