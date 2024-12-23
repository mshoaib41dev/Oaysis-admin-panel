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
  { name: "Bug", data: [5, 10, 15, 20, 25, 10, 5] },
  { name: "Report", data: [10, 15, 5, 10, 30, 20, 10] },
  { name: "General", data: [20, 10, 10, 15, 10, 25, 15] },
];
const campaignsData1 = [
  { name: "Created", data: [5, 10, 15, 20, 25, 10, 5, 5, 15, 20, 10, 15] },
  { name: "Updated", data: [10, 15, 5, 10, 30, 20, 10, 5, 15, 20, 10, 15] },
  { name: "Deleted", data: [20, 10, 10, 15, 10, 25, 15, 5, 15, 20, 10, 15] },
];
const CampaignBarChart = ({
  campaigns = campaignsData,
  campaigns3d = campaignsData1,
  page,
}) => {
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

  const barChartDailyData = {
    labels: ["12 - 2", "2 - 4", "4 - 6", "6 - 8", "8 - 10", "10 - 12"],

    datasets: campaigns3d.map((campaigns3d, index) => ({
      label: campaigns3d.name,
      data: campaigns3d.data,
      backgroundColor: ["#1A3F1E", "#44A54F", "#EA7E24"][index % 3], // Use a repeating color scheme
      borderColor: "rgba(255, 255, 255, 1)",
      borderWidth: 1,
    })),
  };

  const barChartWeeklyData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],

    datasets: campaigns3d.map((campaigns3d, index) => ({
      data: campaigns3d.data,
      backgroundColor: ["#1A3F1E", "#44A54F", "#EA7E24"][index % 3],
      borderColor: "rgba(255, 255, 255, 1)",
      borderWidth: 1,
    })),
  };

  const barChartMonthlyData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: campaigns3d.map((campaigns3d, index) => ({
      data: campaigns3d.data,
      backgroundColor: ["#1A3F1E", "#44A54F", "#EA7E24"][index % 3],
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
        text: "Every 2 Hours",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours",
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

  const chartOptions1 = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Every 2 Hours",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours",
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

  const chartOptionsWeekly = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weekly",
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

  const chartOptionsMonthly = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Monthly",
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
    <div>
      {page === "dashboard" ? (
        <div style={{ width: "300px", height: "400px" }}>
          <Bar data={barChartData} options={chartOptions} />
        </div>
      ) : page === "weekly" ? ( // Check if page is "weekly"
        <div className="h-[80vh] ml-[5vw]">
          <Bar data={barChartWeeklyData} options={chartOptionsWeekly} />
        </div>
      ) : page === "daily" ? ( // Check if page is "daily"
        <div className="h-[80vh] ml-[5vw]">
          <Bar data={barChartDailyData} options={chartOptions1} />
        </div>
      ) : page === "monthly" ? ( // Check if page is "monthly"
        <div className="h-[80vh] ml-[5vw]">
          <Bar data={barChartMonthlyData} options={chartOptionsMonthly} />
        </div>
      ) : (
        <div>
          <p>No data available for this page.</p>
        </div>
      )}
    </div>
  );
};

export default CampaignBarChart;
