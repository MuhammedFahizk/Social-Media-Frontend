import HomeFeeds from "../Ui/HomeFeeds";
import HomeLeftSide from "../Ui/HomeLeftSide";
import Stores from "../Ui/Stores";
import Suggestions from "../Ui/Suggestions";
const Home = () => {
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
          <Suggestions/>

        </div>
      </div>
    </div>
  );
};

export default Home;
