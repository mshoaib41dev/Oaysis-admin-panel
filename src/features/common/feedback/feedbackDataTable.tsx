"use client";
import React, { useState, useEffect } from "react";
import { CommonTable } from "@/features/common/components/molecules/Table";
import { TableCell } from "@/features/common/components/atoms/table";
import { Pagination } from "@/features/common/components/molecules/Pagination";
import { getAllfeedback } from "@/features/common/feedback/actions/feedback_actions";
import { updateFeedback } from "@/features/common/feedback/actions/feedback_actions";

interface Feedback {
  feedback_id: string;
  feedback_description: string;
  feedback_type: string;
  feedback_status: string;
  created_at: string;
}

const headers = [
  { key: "id", label: "Feedback ID" },
  { key: "feedback_id", label: "Feedback ID" },
  { key: "feedback_description", label: "Description" },
  { key: "feedback_type", label: "Type" },
  { key: "created_at", label: "Created At" },
  { key: "feedback_status", label: "Status" },
];

const itemsPerPageOptions = [10, 20, 50];

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("PENDING");
  const [allFeedbackData, setAllFeedbackData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      const response = await getAllfeedback();
      console.log("response", response);
      if (response) {
        const feedbackItems = response?.results?.feedback;
        console.log("fedack", feedbackItems);
        const formattedFeedback =
          feedbackItems?.map((item: any) => ({
            feedback_id: item.feedback_id,
            feedback_description: item.feedback_description,
            feedback_type: item.feedback_type,
            feedback_status: item.feedback_status,
            created_at: new Date(item.created_at).toISOString(),
          })) || [];

        setAllFeedbackData(formattedFeedback);
        setFeedbackData(formattedFeedback);
      }
    };

    fetchAllFeedback();
  }, [itemsPerPage]);

  const handleUpdateFeedback = async (
    feedbackId: string,
    feedbackStatus: string
  ) => {
    try {
      console.log("Updating Feedback:", { feedbackId, feedbackStatus });
      const updateResponse = await updateFeedback({
        feedback_id: feedbackId,
        feedback_status: feedbackStatus,
      });

      // Log the response to check if the update was successful
      console.log("Update Response:", updateResponse);

      // Update the local feedbackData state with the new status
      setFeedbackData((prevData) =>
        prevData.map((item) =>
          item.feedback_id === feedbackId
            ? { ...item, feedback_status: feedbackStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const paginatedData = Array.isArray(feedbackData)
    ? feedbackData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];
  const totalPages = Array.isArray(feedbackData)
    ? Math.ceil(feedbackData.length / itemsPerPage)
    : 0;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleStatusOptions = () => {
    setIsStatusOpen((prev) => !prev);
  };

  const handleFilterChange = async (status: string) => {
    setFilterStatus(status);
    setIsStatusOpen(false);
    setIsDropdownOpen(false);

    // Log the selected filter status
    console.log("Selected filter status:", status);

    // Filter feedback data based on the selected status
    const filteredData = allFeedbackData.filter(
      (item) => item.feedback_status === status
    );
    console.log("Filtered Feedback Items:", filteredData); // Log the filtered items

    // Set feedbackData to filtered data or an empty array if no items match
    setFeedbackData(filteredData.length > 0 ? filteredData : []); // Show empty array if no matches
  };

  // Log the feedbackData before passing it to the table
  console.log("Feedback Data for Table:", feedbackData);

  const handleMouseEnter = () => {
    setIsStatusOpen(true);
  };

  const handleMouseLeave = () => {
    setIsStatusOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6">Feedback</h1>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 hover:bg-gray-100 transition duration-200 mr-[5vw]"
          >
            Filter
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Status
                {isStatusOpen && (
                  <div className="absolute left-10  border border-gray-300 rounded-md bg-white shadow-lg z-10">
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
      <CommonTable
        headers={headers.filter((header) => header.key !== "feedback_id")}
        data={paginatedData}
        renderRow={(feedback: Feedback) => (
          <>
            <TableCell className="px-4 py-2">{feedback.feedback_id}</TableCell>
            <TableCell className="px-4 py-2">
              {feedback.feedback_description}
            </TableCell>
            <TableCell className="px-4 py-2">
              {feedback.feedback_type}
            </TableCell>
            <TableCell className="px-4 py-2">
              {new Date(feedback.created_at).toLocaleString()}
            </TableCell>
            <TableCell className="px-4 py-2">
              <select
                className="border rounded-md p-1"
                onChange={(e) =>
                  handleUpdateFeedback(feedback.feedback_id, e.target.value)
                }
                value={feedback.feedback_status}
              >
                <option value="PENDING">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </TableCell>
          </>
        )}
      />
      {paginatedData.length === 0 && (
        <div className="text-center mt-4 text-gray-500">
          No data found for the selected status.
        </div>
      )}
      <div className="flex items-center justify-end mt-4">
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
