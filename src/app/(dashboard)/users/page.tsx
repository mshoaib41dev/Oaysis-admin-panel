import { getAllUser } from "@/features/users/actions/user-actions";
import UserDataTable from "@/features/users/screens/UserDataTable";
import React from "react";

export default function page() {
  return (
    <div>
      <UserDataTable />
    </div>
  );
}
