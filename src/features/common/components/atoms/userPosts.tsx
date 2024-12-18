"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample posts data
const postsData = [
  { name: "Blog Posts", data: [10, 20, 15, 25, 30, 20, 35] },
  { name: "Forum Posts", data: [5, 15, 10, 20, 25, 15, 30] },
];

const PostsLineChart = ({ posts = postsData }) => {
  // Line chart data configuration
  const lineChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ], // X-axis labels
    datasets: posts.map((post, index) => ({
      label: post.name,
      data: post.data,
      borderColor: ["#3B82F6", "#F87171"][index % 2], // Alternate line colors
      backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background for lines
      borderWidth: 2,
      tension: 0.4, // Curve tension for smooth lines
      pointBackgroundColor: ["#3B82F6", "#F87171"][index % 2], // Points match line colors
      pointBorderWidth: 2,
      pointRadius: 5, // Size of points on the line
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
        text: "Posts Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Posts",
        },
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Line data={lineChartData} options={chartOptions} />
    </div>
  );
};

export default PostsLineChart;
