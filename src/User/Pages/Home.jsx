import HomeFeeds from "../Ui/HomeFeeds";
import HomeLeftSide from "../Ui/HomeLeftSide";
import NavBar from "../Ui/NavBar";
import Stores from "../Ui/Stores";
import Suggestions from "../Ui/Suggestions";
const Home = () => {
  return (
    <div className="dark:bg-darkBody">
      <NavBar />
      <div className="grid lg:grid-cols-9  grid-cols-1   gap-3  p-2 h-fit bg-lightGray dark:bg-[#181818] dark:text-white">
        <div className="lg:hidden ">
          <Stores />
        </div>
        <HomeLeftSide />
        <HomeFeeds />
        <div className="hidden lg:block bg-white rounded-2xl dark:bg-darkNav  w-fit">
          <Stores />
          <Suggestions/>

        </div>
      </div>
    </div>
  );
};

export default Home;
