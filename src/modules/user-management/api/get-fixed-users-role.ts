import { getAllUsers } from "./get-all-users";

export async function getFixUsersRole() {
  const res = await getAllUsers();

  if (typeof res === "string") {
    return res;
  }
  const newUsers = res.map((user) => {
    return {
      ...user,
      role: ["admin", "editor", "viewer"][Math.floor(Math.random() * 3)] as
        | "admin"
        | "editor"
        | "viewer",
    };
  });
  return newUsers;
}
