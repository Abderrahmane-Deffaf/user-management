import UsersListLoader from "@/components/common/users-list-loader";
import { Suspense } from "react";
import UsersList from "../features/users-list/users-list";
import FilterByName from "../features/user-filters/filter-by-name";
import FilterByRole from "../features/user-filters/filter-by-role";
import Link from "next/link";

export default function UsersMainScreen() {
  return (
    <div className=" space-y-4">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <div className=" flex justify-between items-center">
        <div className=" flex gap-4">
          <FilterByName filterBy="firstname" />
          <FilterByName filterBy="lastname" />
          <FilterByRole />
        </div>
        <Link
          className=" px-4 rounded-lg py-2 font-semibold text-white bg-slate-500 border "
          href="/users-list/add-new-user"
        >
          Add New User
        </Link>
      </div>

      <Suspense fallback={<UsersListLoader />}>
        <UsersList />
      </Suspense>
    </div>
  );
}
