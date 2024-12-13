import { getAllUser } from "@/features/users/actions/user-actions";
import UserDataTable from "@/features/users/screens/UserDataTable";
import React from "react";

export default async function page() {
  const allUsers = await getAllUser();
  console.log("Users ==============================", allUsers);

  return (
    <div>
      <UserDataTable allUsers={allUsers} />
    </div>
  );
}
