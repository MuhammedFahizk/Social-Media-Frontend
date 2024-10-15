import { useEffect, useState } from "react";
import { fetchDashBoard } from "../../api/getApi";
import MetricsList from "../Component/Dashboard/MetricsList";
import LineChart from "../Component/Specific/LineChart";
import Tile from "../Component/Specific/Tile";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoIosImages } from "react-icons/io";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { SiH3 } from "react-icons/si";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const newUsersCurrentMonth = dashboardData.userResult?.newUsersCurrentMonth;
  const blockedUsersCurrentMonth =
    dashboardData.userResult?.blockedUsersCurrentMonth;

  const newPostsCurrentMonth = dashboardData.postResult?.newPostsCurrentMonth;
  console.log(newPostsCurrentMonth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDashBoard();
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-3 grid-cols-12">
      <div className="col-span-8  p-4">
        <LineChart fullMonthlyData={dashboardData.fullMonthlyData || []} />
      </div>
      <div className="col-span-4 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 flex flex-col justify-between items-center">
    Current Month Overview
    <span className="text-sm text-gray-600">
      {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
    </span>
  </h3>
  <div className="grid grid-cols-1 gap-4">
  {newUsersCurrentMonth && (
    <Tile
      color="bg-blue-100"
      label={
        <div className="flex items-center gap-4">
          <PiUsersThreeFill className="text-blue-600" size={24} />
          <div className="flex flex-col">
            <span className="text-gray-700 font-medium">New Users</span>
            <span className="text-2xl text-blue-600 font-bold">
              {newUsersCurrentMonth.count}
            </span>
          </div>
        </div>
      }
    />
  )}
  {newPostsCurrentMonth && (
    <Tile
      color="bg-green-100"
      label={
        <div className="flex items-center gap-4">
          <IoIosImages className="text-green-600" size={24} />
          <div className="flex flex-col">
            <span className="text-gray-700 font-medium">New Posts</span>
            <span className="text-2xl text-green-600 font-bold">
              {newPostsCurrentMonth.count}
            </span>
          </div>
        </div>
      }
    />
  )}
  {blockedUsersCurrentMonth && (
    <Tile
      color="bg-orange-100"
      label={
        <div className="flex items-center gap-4">
          <AiOutlineUsergroupDelete className="text-orange-600" size={24} />
          <div className="flex flex-col">
            <span className="text-gray-700 font-medium">Blocked Users</span>
            <span className="text-2xl text-orange-600 font-bold">
              {blockedUsersCurrentMonth.count}
            </span>
          </div>
        </div>
      }
    />
  )}
</div>

</div>


      <div className="col-span-12 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className="mt-4 text-xl font-bold">Users Details</h3>
          <MetricsList data={dashboardData.userResult || []} />
        </div>
        <div className="col-span-1">
          <h3 className="mt-4 text-xl font-bold">Posts Details</h3>
          <MetricsList data={dashboardData.postResult || []} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
