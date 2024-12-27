import { Button } from "@/features/common/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/features/common/components/atoms/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import ProfileCards from "./ProfileCards";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@radix-ui/react-tabs";
import { TableCell } from "@/features/common/components/atoms/table";
import { CommonTable } from "@/features/common/components/molecules/Table";
import Image from "next/image";

interface ViewProfileModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User | null;
}

interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string | number | null;
  isEmailVerified: boolean;
  profiles: any[];
}

const staticUsers: User[] = [
  {
    id: "1",
    profile: "/assets/images/login.png",
    mobile_number: "1234567890",
    isEmailVerified: true,
    profiles: [],
  },
  {
    id: "2",
    profile: "/assets/images/login.png",
    mobile_number: "0987654321",
    isEmailVerified: false,
    profiles: [],
  },
];

const headers = [
  { key: "id", label: "ID" },
  { key: "profile", label: "profile" },
  { key: "mobile", label: "Mobile" },
  { key: "Verified_User", label: "Verified User" },
  { key: "Associated_Accounts", label: "Associated Accounts" },
  { key: "actions", label: "Actions" },
];

const UserDetailModel = ({ open, setOpen, user }: ViewProfileModalProps) => {
  const [activeTab, setActiveTab] = useState("Accounts");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-[90vw] max-h-[800px] flex flex-col justify-center space-y-5">
        <DialogTitle>User Detail Modal</DialogTitle>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex space-x-2">
            <TabsTrigger
              value="Accounts"
              className={`py-2 px-4 rounded-md transition-colors ${
                activeTab === "Accounts"
                  ? "!bg-gradient-to-b from-[#0290BE] to-[#0DBF91]"
                  : "bg-gray-200 text-black"
              }`}
            >
              Associated Accounts
            </TabsTrigger>

            <TabsTrigger
              value="Posts"
              className={`py-2 px-4 rounded-md transition-colors ${
                activeTab === "Posts"
                  ? "!bg-gradient-to-b from-[#0290BE] to-[#0DBF91]"
                  : "bg-gray-200 text-black"
              }`}
            >
              Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Accounts">
            <div className="flex mt-5">
              <div className="border border-gray-300 w-[50vh] p-7 ml-10 bg-[#F0F4F7]">
                {user && (
                  <>
                    <h3 className="font-bold">Email</h3>
                    <p>{user.email}</p>
                    <h3 className="font-bold">Mobile Number</h3>
                    <p>{user.mobile_number || "N/A"}</p>
                    <h3 className="font-bold">Email Verified</h3>
                    <p>{user.isEmailVerified ? "Yes" : "No"}</p>
                    <h3 className="font-bold">Profile Complete</h3>
                    <p>{user.profiles.length > 0 ? "Yes" : "No"}</p>
                  </>
                )}
              </div>

              <div className="border w-[130vh] p-7 bg-[#F0F4F7] flex flex-wrap space-x-4 border-gray-300">
                {user?.profiles &&
                  user.profiles.map((profile, profileIndex) => (
                    <div className="flex-1 min-w-[30%] mb-4" key={profileIndex}>
                      <ProfileCards user={profile} />
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Posts">
            <div className="mt-5 ">
              <CommonTable
                headers={headers}
                data={staticUsers}
                className="border border-gray-300"
                renderRow={(user: User) => (
                  <>
                    <TableCell className="py-2">{user.id}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Image
                        src="/assets/images/login.png"
                        alt="Login illustration"
                        className="dark:invert"
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {user.mobile_number ? user.mobile_number : "null"}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {user.isEmailVerified ? "Verified" : "UnVerified"}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {user.profiles.length}
                    </TableCell>
                    <TableCell className="px-4 py-2 flex justify-center ">
                      <Button
                        variant="ghost"
                        onClick={() => console.log("View user:", user)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => console.log("Block user:", user)}
                      >
                        Block
                      </Button>
                    </TableCell>
                  </>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>

        {activeTab === "Accounts" && (
          <div className="flex justify-end ">
            <Button variant="default" size="sm" className="mt-4 w-[100px]">
              Block User
            </Button>
            <div className="ml-2">
              <Button
                variant="default"
                size="sm"
                className="mt-4 w-[100px] mr-2"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModel;
