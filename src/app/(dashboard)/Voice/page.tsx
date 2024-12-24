"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import UserChart from "@/features/common/components/atoms/userChart";
import { Button } from "@/features/common/components/atoms/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/features/common/components/atoms/dialog";
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css";

const page = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="mt-5 ml-3 flex">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex space-x-2">
          <TabsTrigger
            value="Daily"
            className={`py-2 px-4 rounded-md transition-colors ${
              activeTab === "Daily"
                ? "!bg-gradient-to-b from-[#0290BE]  to-[#0DBF91]"
                : "bg-gray-200 text-black"
            }`}
          >
            Daily
          </TabsTrigger>

          <TabsTrigger
            value="Weekly"
            className={`py-2 px-4 rounded-md transition-colors ${
              activeTab === "Weekly"
                ? "!bg-gradient-to-b from-[#0290BE]  to-[#0DBF91]"
                : "bg-gray-200 text-black"
            }`}
          >
            Weekly
          </TabsTrigger>

          <TabsTrigger
            value="Monthly"
            className={`py-2 px-4 rounded-md transition-colors ${
              activeTab === "Monthly"
                ? "!bg-gradient-to-b from-[#0290BE]  to-[#0DBF91]"
                : "bg-gray-200 text-black"
            }`}
          >
            Monthly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Daily">
          <div className="w-[55vw] h-[65vh]">
            <UserChart page="daily" />
          </div>
        </TabsContent>

        <TabsContent value="Weekly">
          <div className="w-[55vw] h-[65vh]">
            <UserChart page="weekly" />
          </div>
        </TabsContent>

        <TabsContent value="Monthly">
          <div className="w-[55vw] h-[65vh]">
            <UserChart page="monthly" />
          </div>
        </TabsContent>
      </Tabs>

      <Button
        className="ml-auto flex items-center space-x-1 mr-5"
        onClick={handleFilterClick}
      >
        <Filter className="h-5 w-5" />
        <span>Filters</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="!w-[20vw] max-h-[800px] flex flex-col justify-center space-y-5">
          <DialogTitle>Filter</DialogTitle>
          <div className="flex flex-col">
            <label>
              From:
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a start date"
                className="border rounded p-2"
              />
            </label>
            <label>
              To:
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select an end date"
                className="border rounded p-2"
              />
            </label>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
