"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/features/common/components/atoms/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CommonTable } from "@/features/common/components/molecules/Table";
import { TableCell } from "@/features/common/components/atoms/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/features/common/components/atoms/button";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import ReportDetailModal from "@/features/common/Reports/ReportDetailModal";

// Define constant headers and data outside the component
const headers = [
  { key: "id", label: "ID" },
  { key: "reporter_email", label: "Reporter Email" },
  { key: "reported_email", label: "Reported Email" },
  { key: "Report_Type", label: "Report_Type" },
  { key: "Verified_User", label: "Verified User" },
  { key: "feedback_status", label: "Status" },
  { key: "actions", label: "Actions" },
];

// Sample constant data (replace with your actual data)
const constantData: User[] = [
  {
    id: 1,
    reporter_email: "user1@example.com",
    reported_email: "user2@example.com",
    Report_Type: "I just don’t like it",
    isEmailVerified: true,
    profiles: [],
  },
  {
    id: 2,
    reporter_email: "user2@example.com",
    reported_email: "user1@example.com",
    Report_Type: "Scam",
    isEmailVerified: false,
    profiles: [],
  },
  // Add more constant user data as needed
];

const Page = () => {
  const itemsPerPageOptions = [10, 20, 50];
  const [activeTab, setActiveTab] = useState("Highlight");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setStatusOpen(true);
  };

  const handleMouseLeave = () => {
    setStatusOpen(false);
  };

  const paginatedData = constantData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(constantData.length / itemsPerPage);

  const renderRow = (user: User) => (
    <>
      <TableCell className="py-2 px-4 border-b">{user?.id}</TableCell>
      <TableCell className="px-4 py-2 border-b">
        {user?.reporter_email}
      </TableCell>
      <TableCell className="px-4 py-2 border-b">
        {user?.reported_email}
      </TableCell>
      <TableCell className="px-4 py-2 border-b">
        {user?.Report_Type ? user.Report_Type : "null"}
      </TableCell>
      <TableCell className="px-4 py-2 border-b">
        {user?.isEmailVerified ? "Verified" : "UnVerified"}
      </TableCell>
      <TableCell className="px-4 py-2 border-b">
        <select
          className="border rounded-md p-1"
          onChange={(e) => handleUpdateFeedback(user.id, e.target.value)}
          value={user.feedback_status}
        >
          <option value="PENDING">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </TableCell>
      <TableCell className="px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[110px] bg-white shadow-lg rounded-md"
          >
            <DropdownMenuItem
              className="cursor-pointer flex"
              onClick={() => {
                setSelectedFeedback(user);
                setFeedbackModalOpen(true);
              }}
            >
              <Eye className="mr-1 h-4 w-4 text-red-500 ml-3" />
              View Detail
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex">
              <Pencil className="mr-2 h-4 w-3 ml-3" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </>
  );

  const tabs = [
    { value: "Highlight", label: "Highlight" },
    { value: "Stories", label: "Stories" },
    { value: "Dm", label: "Dm" },
    { value: "Post", label: "Post" },
    { value: "Profiles", label: "Profiles" },
  ];

  const tabContent = [
    {
      value: "Highlight",
      renderRow: (user: User) => renderRow(user),
    },
    {
      value: "Stories",
      renderRow: (user: User) => (
        <>
          <TableCell className="py-2 px-4 border-b">{user?.id}</TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reporter_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reported_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.Report_Type ? user.Report_Type : "null"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.isEmailVerified ? "Verified" : "UnVerified"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            <select
              className="border rounded-md p-1"
              onChange={(e) => handleUpdateFeedback(user.id, e.target.value)}
              value={user.feedback_status}
            >
              <option value="PENDING">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </TableCell>
          <TableCell className="px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[110px] bg-white shadow-lg rounded-md"
              >
                <DropdownMenuItem
                  className="cursor-pointer flex"
                  onClick={() => {
                    setSelectedFeedback(user);
                    setFeedbackModalOpen(true);
                  }}
                >
                  <Eye className="mr-1 h-4 w-4 text-red-500 ml-3" />
                  View Detail
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex">
                  <Pencil className="mr-2 h-4 w-3 ml-3" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      ),
    },
    {
      value: "Dm",
      renderRow: (user: User) => (
        <>
          <TableCell className="py-2 px-4 border-b">{user?.id}</TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reporter_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reported_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.Report_Type ? user.Report_Type : "null"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.isEmailVerified ? "Verified" : "UnVerified"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            <select className="border rounded-md p-1">
              <option value="PENDING">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </TableCell>
          <TableCell className="px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[110px] bg-white shadow-lg rounded-md"
              >
                <DropdownMenuItem
                  className="cursor-pointer flex"
                  onClick={() => {
                    setSelectedFeedback(user);
                    setFeedbackModalOpen(true);
                  }}
                >
                  <Eye className="mr-1 h-4 w-4 text-red-500 ml-3" />
                  View Detail
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex">
                  <Pencil className="mr-2 h-4 w-3 ml-3" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      ),
    },
    {
      value: "Post",
      renderRow: (user: User) => (
        <>
          <TableCell className="py-2 px-4 border-b">{user?.id}</TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reporter_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reported_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.Report_Type ? user.Report_Type : "null"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.isEmailVerified ? "Verified" : "UnVerified"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            <select
              className="border rounded-md p-1"
              onChange={(e) => handleUpdateFeedback(user.id, e.target.value)}
              value={user.feedback_status}
            >
              <option value="PENDING">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </TableCell>
          <TableCell className="px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[110px] bg-white shadow-lg rounded-md"
              >
                <DropdownMenuItem
                  className="cursor-pointer flex"
                  onClick={() => {
                    setSelectedFeedback(user);
                    setFeedbackModalOpen(true);
                  }}
                >
                  <Eye className="mr-1 h-4 w-4 text-red-500 ml-3" />
                  View Detail
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex">
                  <Pencil className="mr-2 h-4 w-3 ml-3" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      ),
    },
    {
      value: "Profiles",
      renderRow: (user: User) => (
        <>
          <TableCell className="py-2 px-4 border-b">{user?.id}</TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reporter_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.reported_email}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.Report_Type ? user.Report_Type : "null"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            {user?.isEmailVerified ? "Verified" : "UnVerified"}
          </TableCell>
          <TableCell className="px-4 py-2 border-b">
            <select
              className="border rounded-md p-1"
              onChange={(e) => handleUpdateFeedback(user.id, e.target.value)}
              value={user.feedback_status}
            >
              <option value="PENDING">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </TableCell>
          <TableCell className="px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[110px] bg-white shadow-lg rounded-md"
              >
                <DropdownMenuItem
                  className="cursor-pointer flex"
                  onClick={() => {
                    setSelectedFeedback(user);
                    setFeedbackModalOpen(true);
                  }}
                >
                  <Eye className="mr-1 h-4 w-4 text-red-500 ml-3" />
                  View Detail
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex">
                  <Pencil className="mr-2 h-4 w-3 ml-3" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      ),
    },
  ];

  return (
    <div className="mt-5 ml-3 flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Reports</h2>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 hover:bg-gray-100 transition duration-200 mr-10"
          >
            Filter
          </button>
          {isDropdownOpen && (
            <div className="absolute right-5 mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Status
                {isStatusOpen && (
                  <div className="absolute right-10 border border-gray-300 rounded-md bg-white shadow-lg z-10">
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterChange("PENDING")}
                    >
                      Pending
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterChange("REJECTED")}
                    >
                      Rejected
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFilterChange("resolved")}
                    >
                      RESOLVED
                    </div>
                  </div>
                )}
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Sort clicked")}
              >
                Sort
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex space-x-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`py-2 px-4 rounded-md transition-colors ${
                activeTab === tab.value
                  ? "!bg-gradient-to-b from-[#0290BE]  to-[#0DBF91]"
                  : "bg-gray-200 text-black"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="mt-5 pr-5 ">
            <CommonTable
              headers={headers}
              data={paginatedData}
              className="border border-gray-300"
              renderRow={
                tabContent.find((tab) => tab.value === activeTab)?.renderRow
              }
            />
          </div>
        </TabsContent>
      </Tabs>

      <ReportDetailModal
        open={isFeedbackModalOpen}
        setOpen={setFeedbackModalOpen}
        feedback={selectedFeedback}
        variant={activeTab || ""}
      />
    </div>
  );
};

export default Page;
