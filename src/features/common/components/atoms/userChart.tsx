"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample campaign data for weekdays
const campaignsData = [
  { name: "Bug", data: [5, 10, 15, 20, 25, 10, 5] }, // Example counts for weekdays
  { name: "Report", data: [10, 15, 5, 10, 30, 20, 10] },
  { name: "General", data: [20, 10, 10, 15, 10, 25, 15] },
];

const CampaignBarChart = ({ campaigns = campaignsData }) => {
  // Bar chart data configuration
  const barChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: campaigns.map((campaign, index) => ({
      label: campaign.name,
      data: campaign.data,
      backgroundColor: ["#1A3F1E", "#44A54F", "#EA7E24"][index % 3], // Use a repeating color scheme
      borderColor: "rgba(255, 255, 255, 1)",
      borderWidth: 1,
    })),
  };

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Campaigns by Weekday",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weekdays",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Bar data={barChartData} options={chartOptions} />
    </div>
  );
};

export default CampaignBarChart;
