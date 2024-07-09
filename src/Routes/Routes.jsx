import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../Admin/private/Pages/AdminDashboard";
import AdminLoginPage from "../Admin/Public/Pages/AdminLoginPage";
import ProtectedRoutesAdmin from "../Admin/util/ProtectedRoutesAdmin";
import UserLoginPage from "../User/Pages/UserLoginPage";
import UserSignUpPage from "../User/Pages/UserSignUpPage";
import ProtectedRoutUser from "../User/Utils.js/ProtectedRoutUser";
import Home from "../User/Pages/Home";
export const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        children: [
          {
            path: "",
            element: <ProtectedRoutesAdmin />,
            children: [
              {
                path: "Dashboard",
                element: <AdminDashboardPage />,
              }, 
            ],
          },
          {
            path: "login",
            element: <AdminLoginPage />,
          },
        ],
      },
      {
        path: "/",
        children: [
          {
            path: "/login",
            element: <UserLoginPage />,
          },
          {
            path: "/",
            element: <ProtectedRoutUser />,
            children: [
              {
                path: "home" ,
                element: <Home/>,
              },
              {
                path: "" ,
                element: <Home/>,
              },
            ],
          },
          {
            path: "/signUp",
            element: <UserSignUpPage />,
          },
        ],
      },
    ],
  },
]);
