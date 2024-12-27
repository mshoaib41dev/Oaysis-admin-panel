"use client";
import React, { useState, useEffect } from "react";
import { CommonTable } from "@/features/common/components/molecules/Table";
import { TableCell } from "@/features/common/components/atoms/table";
import { Eye, Search } from "lucide-react";
import { Ban, Trash2 } from "lucide-react";
import { Pagination } from "@/features/common/components/molecules/Pagination";
import { Button } from "@/features/common/components/atoms/button";
import UserDetailModel from "@/features/users/screens/UserDetailModel";
import { Input } from "@/features/common/components/atoms/input";
import { getAllUser } from "../actions/user-actions";
import { getPostsByID } from "../actions/user-actions";

interface User {
  id?: string;
  email: string;
  mobile_number: string | number | null;
  isEmailVerified: boolean;
  profiles: any[];
}

const headers = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "mobile", label: "Mobile" },
  { key: "Verified_User", label: "Verified User" },
  { key: "Associated_Accounts", label: "Associated Accounts" },
  { key: "actions", label: "Actions" },
];

const itemsPerPageOptions = [10, 20, 50];

export default function UserDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [userDataLength, setUserDataLength] = useState(10);
  const [userData, setUserData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const paginatedData = (userData || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil((userData?.length || 0) / itemsPerPage);

  const getData = async (page: number, itemsPerPage: number) => {
    const response = await getAllUser(page, itemsPerPage);
    // console.log("Response Check", response?.users?.results);

    if (response) {
      const transformedData = response?.users?.results?.map((item: User) => ({
        id: item.id,
        email: item.email,
        mobile_number: item.mobile_number,
        isEmailVerified: item.isEmailVerified,
        profiles: item.profiles.map((profile) => ({
          first_name: profile.first_name,
          last_name: profile.last_name,
          username: profile.username,
          is_private: profile.is_private,
          mute_status: profile.mute_status,
        })),
      }));
      console.log("Transformed Data", transformedData);
      setUserData(transformedData);
      setUserDataLength(transformedData.length);
    }
  };

  useEffect(() => {
    getData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const getPosts = async (id: string) => {
    const response1 = await getPostsByID(id);
    console.log("Posts Data", response1);
  };  
  useEffect(() => {
    const userId = selectedUser?.id;
    if (userId) {
      getPosts(userId);
    }
  }, [selectedUser]);

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="relative w-[30vh]">
          <input
            type="text"
            placeholder="Search..."
            className="pl-5 pr-4 py-2 border border-gray-300 rounded-md outline-none w-full"
          />
          <Search
            size={20}
            color="gray"
            className="absolute left-[25vh] top-1/3 transform -translate-y-1/3"
          />
        </div>
      </div>

      <CommonTable
        headers={headers}
        data={paginatedData}
        renderRow={(user: User) => (
          <>
            <TableCell className="py-2">{user?.id}</TableCell>
            <TableCell className="px-4 py-2">{user?.email}</TableCell>
            <TableCell className="px-4 py-2">
              {user?.mobile_number ? user.mobile_number : "null"}
            </TableCell>
            <TableCell className="px-4 py-2">
              {user?.isEmailVerified ? "Verified" : "UnVerified"}
            </TableCell>
            <TableCell className="px-4 py-2">
              {user.profiles.length || 0}
            </TableCell>
            <TableCell className="px-4 py-2 flex justify-end space-x-2 justify-around">
              <Eye
                className="h-4 w-4 text-muted-foreground"
                onClick={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
              />
              <Ban className="h-4 w-4 cursor-pointer" />
              <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
            </TableCell>
          </>
        )}
      />
      <UserDetailModel
        open={isModalOpen}
        setOpen={setIsModalOpen}
        user={selectedUser}
      />

      <div className="flex items-center justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
