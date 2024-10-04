import { useEffect, useState } from "react";
import HomeFeeds from "../specific/HomeFeeds";
import HomeLeftSide from "../specific/HomeLeftSide";
import Stores from "../specific/Stores";
import Suggestions from "../specific/Suggestions";
import { HomePage } from "../auth/authUser";
import Loading from "../component/Loading";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HomePage();
        console.log('result', result);
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('data', data);

  if (loading) {
    return <div>
      <Loading />
    </div>
  }

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className="text-text-light">
      <div className="grid lg:grid-cols-9 grid-cols-1  gap-3 md:p-2 h-full dark:text-white">
        <div className="lg:hidden">
          <Stores />
        </div>

        <HomeLeftSide data={data.user} />
        <HomeFeeds />
        <div className="hidden lg:block bg-ternary-light shadow-md dark:shadow-md rounded-2xl dark:bg-secondary-dark w-fit">
          <Stores />
          <Suggestions  />
        </div>
      </div>
    </div>
  );
};

export default Home;
