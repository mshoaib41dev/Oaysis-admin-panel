import { getAllfeedback } from "@/features/common/feedback/actions/feedback_actions";
import FeedbackDataTable from "@/features/common/feedback/feedbackDataTable";
import React from "react";

export default function page() {
  return (
    <div>
      <FeedbackDataTable />
    </div>
  );
}
