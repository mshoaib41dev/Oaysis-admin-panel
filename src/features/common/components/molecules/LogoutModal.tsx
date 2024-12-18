import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/features/common/components/atoms/dialog";
import { useRouter } from "next/navigation";
import { Button } from "../atoms/button";
import { logoutUser } from "@/features/login/actions/login-actions";
import Image from "next/image";

const LogoutModal = ({ onClose }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result?.success) {
      console.log(result.message);
      router.push("/login");
    } else {
      console.error(result?.message);
    }
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className="text-lg font-bold">Confirm Logout</DialogTitle>
      <DialogContent className="!w-[25vw]">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/images/logIcon.png"
            alt="DevSoul Logo"
            className="dark:invert"
            width={60}
            height={60}
          />
          <p className="py-4">Are you sure you want to logout?</p>
          <div className=" space-x-4 w-full flex flex-row justify-between items-center mt-5">
            <Button
              onClick={onClose}
              className="bg-gray-300 text-black  rounded hover:bg-gray-400 w-1/2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="!bg-gradient-to-r from-[#0290BE]  to-[#0DBF91] text-white px-4 py-2 rounded hover:bg-red-600 w-1/2"
            >
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
