"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Text } from "@/features/common/components/atoms/Text";
import { logo } from "../../../../../public/assets";
import { AiOutlineClose } from "react-icons/ai";
import LogoutModal from "@/features/common/components/molecules/LogoutModal";

interface SidebarProps {
  isExpanded?: boolean;
  toggleSidebar?: () => void;
  setIsExpanded?: (expanded: boolean) => void;
  expandOnly?: boolean;
  closeSidebar?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  expandOnly = false,
  closeSidebar,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  // const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: `/assets/images/menuInActive.png`,
      activeIcon: `/assets/images/menuActive.png`,
      path: `/dashboard`,
    },
    {
      name: "Users",
      icon: `/assets/images/usersInactive.png`,
      activeIcon: `/assets/images/usersActive.png`,
      path: `/users`,
    },
    {
      name: "Feedback",
      icon: `/assets/images/feedbackInactive.png`,
      activeIcon: `/assets/images/feedbackActive.png`,
      path: `/feedback`,
    },
    {
      name: "Posts",
      icon: `/assets/images/PostInactive.png`,
      activeIcon: `/assets/images/PostActive.png`,
      path: `/posts`,
    },
    {
      name: "3D Photos",
      icon: `/assets/images/3dPhotoInactive.png`,
      activeIcon: `/assets/images/3dPhotoActive.png`,
      path: `/3dphoto`,
    },
    {
      name: "Voice",
      icon: `/assets/images/VoiceInactive.png`,
      activeIcon: `/assets/images/VoiceActive.png`,
      path: `/Voice`,
    },
    {
      name: "Chatbot",
      icon: `/assets/images/ChatbotINactive.png`,
      activeIcon: `/assets/images/ChatbotActive.png`,
      path: `/Voice`,
    },
    {
      name: "VideoCall",
      icon: `/assets/images/VideoInactive.png`,
      activeIcon: `/assets/images/VideoActive.png`,
      path: `/Voice`,
    },
    {
      name: "AudioCall",
      icon: `/assets/images/CallInActive.png`,
      activeIcon: `/assets/images/CallActive.png`,
      path: `/Voice`,
    },
    {
      icon: `/assets/images/logout.png`,
      name: "Logout",
    },
  ];

  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (expandOnly) {
      setSidebarExpanded(true);
      return;
    }
    const handleResize = () => {
      setSidebarExpanded(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [expandOnly]);
  return (
    <div
      className={`transition-all duration-300 ${
        !expandOnly &&
        (isSidebarExpanded
          ? "w-1/5 min-w-[300px] max-w-[310px]"
          : "w-[8%] min-w-[88px] max-w-[88px]")
      } ${expandOnly ? "block w-screen" : "hidden md:block"}  h-screen`}
    >
      <aside className="w-full bg-white h-full shadow-md p-4 flex flex-col">
        <div
          className={`${
            isSidebarExpanded ? "p-4" : "p-2"
          } w-full flex flex-row justify-between items-center`}
        >
          <div className="flex justify-center items-center self-center">
            {expandOnly || isSidebarExpanded ? (
              <Image
                src="/assets/images/logo.png"
                width={65}
                height={40}
                alt="Ling"
                unoptimized
                className="w-16 h-10"
              />
            ) : (
              <div
                onClick={toggleSidebar}
                className="relative w-12 h-12 cursor-pointer group -ml-1"
              >
                <Image
                  src="/assets/images/logo.png"
                  width={48}
                  height={48}
                  alt="Ling"
                  unoptimized
                  className="w-12 h-12 transition-opacity duration-300 group-hover:opacity-0"
                />
                <div className="w-12 h-12 bg-background-aliceBlue rounded-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Image
                    src="/assets/images/logo.png"
                    width={24}
                    height={24}
                    alt="Ling"
                    unoptimized
                    className="w-6 h-6"
                  />
                </div>
              </div>
            )}
          </div>
          {expandOnly ? (
            <div className="cursor-pointer flex" onClick={closeSidebar}>
              <Image
                src="/assets/images/logo.png"
                width={24}
                height={24}
                alt="Ling"
                unoptimized
                className="w-6 h-6"
              />
            </div>
          ) : (
            <div className="cursor-pointer flex" onClick={toggleSidebar}>
              <AiOutlineClose
                className="w-10 h-5 text-gray-500  "
                aria-label="Close Icon"
              />
            </div>
          )}
        </div>
        <div className="overflow-y-auto w-full flex-grow pt-10">
          <nav className="w-full">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <div
                    onClick={
                      item.name === "Logout"
                        ? handleLogoutClick
                        : () => router.push(item.path)
                    }
                    className={`flex flex-row items-center space-x-3 px-5 py-3 rounded-[16px] cursor-pointer w-full hover:bg-background-aliceBlue ${
                      pathname === item.path
                        ? "bg-background-aliceBlue"
                        : "bg-transparent"
                    } ${
                      expandOnly || isSidebarExpanded
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    <Image
                      src={pathname === item.path ? item.activeIcon : item.icon}
                      width={24}
                      height={24}
                      alt="Ling"
                      unoptimized
                      className="w-6 min-w-6 h-6 min-h-6"
                    />
                    <Text
                      className={`font-bold text-lg font-poppins ${
                        expandOnly || isSidebarExpanded ? "flex" : "hidden"
                      } ${
                        pathname === item.path
                          ? "text-typography-orange"
                          : item.name === "Logout"
                          ? "text-red-500"
                          : "text-typography-darkBlue"
                      }`}
                    >
                      {item.name}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {isDialogOpen && <LogoutModal onClose={handleCloseDialog} />}
      </aside>
    </div>
  );
};
export default Sidebar;
