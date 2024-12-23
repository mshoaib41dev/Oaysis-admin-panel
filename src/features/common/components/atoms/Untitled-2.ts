"Detail Model "
import { Button } from "@/features/common/components/atoms/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/common/components/atoms/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import ProfileCards from "./ProfileCards";

interface ViewProfileModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User | null;
}

const UserDetailModel = ({ open, setOpen, user }: ViewProfileModalProps) => {
  console.log("USD", user);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!w-[90vw]  max-h-[800px] flex flex-col justify-center space-y-5 ">
          <DialogTitle>User Detail Modal</DialogTitle>

          <div className="flex">
            <div className="border w-[50vh] p-7 ml-10 bg-white ">
              {user && (
                <>
                  <h3 className="font-bold">Name</h3>
                  {/* <p>{user.first_name}</p> */}
                  <h3 className="font-bold">Email</h3>
                  <p>{user.email}</p>
                  <h3 className="font-bold">Mobile Number</h3>
                  <p>{user.mobile_number || "N/A"}</p>
                  <h3 className="font-bold">Email Verified</h3>
                  <p>{user.isEmailVerified ? "Yes" : "No"}</p>
                  <h3 className="font-bold">Profile Complete</h3>
                  <p>{user.profiles.length > 0 ? "Yes" : "No"}</p>
                  {/* <ProfileCards user={user} /> */}
                </>
              )}
            </div>

            <div className="border w-[130vh] p-7 bg-white flex space-x-4 items-center">
              {user?.profiles &&
                user?.profiles?.map((profile, profileIndex) => (
                  <ProfileCards user={profile} key={profileIndex} />
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDetailModel;
