import ErrorMessage from "@/components/common/ErrorMessage";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateUserDetails } from "../update-user-details/update-user-details";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { userSearchParamsCache } from "../../api/get-user-search-params";
import { getAllUsers } from "../../api/get-all-users";

export default async function UsersList() {
  const res = await getAllUsers();
  if (typeof res === "string") {
    return <ErrorMessage message={res} />;
  }
  const page = userSearchParamsCache.get("page");

  return (
    <div>
      <Table className="w-full">
        <TableCaption>Users List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {res.map((user) => (
            <UpdateUserDetails key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page < 2}
              href={`?page=${page - 1}`}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href={`?page=${page}`} isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext disabled={page > 4} href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
