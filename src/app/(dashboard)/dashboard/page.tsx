// import Graph from "@/components/molecules/Dashboard/Graph";
import { Text } from "@/features/common/components/atoms/Text";
import type React from "react";
import Cards from "@/features/common/components/atoms"; // Adjust the import path as necessary
import UserCards from "@/features/common/components/atoms/userCards"; // Import UserCards
import UserChart from "@/features/common/components/atoms/userChart"; // Correct import for UserChart
import UserPosts from "@/features/common/components/atoms/userPosts"; // Correct import for UserPosts
// import { Line } from 'react-chartjs-2';
interface DashboardPageProps {}

const cardData = [
  {
    bgColor: "from-[#E0EAFC] to-[#CFDEF3]",
    title: "New Users  ",
    amount: "12,856",
    preview: "Preview 30 Days",
  },
  {
    bgColor: "from-[#EEE8FB] to-[#E9E4F0]",
    title: "New Posts  ",
    amount: "12,856",
    preview: "Preview 30 Days",
  },
  {
    bgColor: "from-[#FFEEEE] to-[#DDEFBB]",
    title: "New Feedback  ",
    amount: "12,856",
    preview: "Preview 30 Days",
  },
];

const DashboardStats: React.FC<DashboardPageProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className="flex flex-row gap-4 p-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.bgColor} rounded-md px-4 py-5 w-full `}
          >
            <div className="flex flex-col w-full justify-start items-start">
              <Text className="text-lg font-normal ">{card.title}</Text>

              <Text className="font-semibold text-2xl my-4 ">
                {card.amount}
              </Text>
              <Text className="text-lg font-normal ">{card.preview}</Text>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 p-4 w-full overflow-hidden">
        <div className="">
          <UserChart page="dashboard" />
        </div>
        <div className="bg-white rounded-md p-4 shadow w-1/2">
          <UserPosts />
        </div>
        <div className="bg-white rounded-md p-4 shadow w-1/2">
          <UserCards />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
