import { useEffect, useState } from "react";
import { fetchDashBoard } from "../../api/getApi";
import MetricsList from "../Component/Dashboard/MetricsList";
import LineChart from "../Component/Specific/LineChart";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState([]);

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
      <div className="col-span-12 grid grid-cols-2 gap-4" >
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
