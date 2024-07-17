import { useEffect, useState } from "react";
import HomeFeeds from "../Ui/HomeFeeds";
import HomeLeftSide from "../Ui/HomeLeftSide";
import Stores from "../Ui/Stores";
import Suggestions from "../Ui/Suggestions";
import { HomePage } from "../auth/authUser";
const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const result = await HomePage();
        console.log('result',result);
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      }
    };

    fetchData();
    console.log('data',data);
  }, [])
  return (
    <div className=" text-text-light " >
      <div className="grid lg:grid-cols-9   grid-cols-1   gap-3  md:p-2 h-full   dark:text-white">
        <div className="lg:hidden ">
          <Stores />
        </div>
        <HomeLeftSide />
        <HomeFeeds />
        <div className="hidden lg:block bg-ternary-light shadow-md dark:shadow-md rounded-2xl dark:bg-secondary-dark  w-fit">
          <Stores />
          <Suggestions data={data}/>

        </div>
      </div>
    </div>
  );
};

export default Home;
