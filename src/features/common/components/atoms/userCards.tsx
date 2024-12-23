"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  ScatterController,
  Legend,
} from "chart.js";
import { Text } from "@/features/common/components/atoms/Text";

ChartJS.register(ArcElement, ScatterController, Legend);

// Sample array of campaign data
const campaignsData = [
  { name: "Bug", count: 10 },
  { name: "Report", count: 20 },
  { name: "General ", count: 15 },
];

const CampaignChart = ({ campaigns = campaignsData }) => {
  const doughnutChartData = {
    labels: campaigns.map((category) => category.name),
    datasets: [
      {
        label: "Campaigns by Category",
        data: campaigns.map((category) => category.count),
        backgroundColor: ["#1A3F1E", "#44A54F", "#EA7E24"],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      ScatterController: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "200px", height: "300px" }}>
      <Doughnut data={doughnutChartData} options={chartOptions} />
    </div>
  );
};

export default CampaignChart;
