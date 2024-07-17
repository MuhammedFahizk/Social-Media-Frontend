import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../Admin/private/Pages/AdminDashboard";
import AdminLoginPage from "../Admin/Public/Pages/AdminLoginPage";
import ProtectedRoutesAdmin from "../Admin/util/ProtectedRoutesAdmin";
import UserLoginPage from "../User/Pages/UserLoginPage";
import UserSignUpPage from "../User/Pages/UserSignUpPage";
import ProtectedRoutUser from "../User/Utils.js/ProtectedRoutUser";
import Home from "../User/Pages/Home";
import ProfileLPage from "../User/Pages/ProfileLPage";
import NavBar from "../User/Ui/NavBar";
import AdminLayout from "../Admin/private/Component/AdminLayout";
import Users from "../Admin/private/Pages/Users";
export const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        element: <AdminLayout/>,
        children: [
          {
            path: "",
            element: <ProtectedRoutesAdmin />,
            children: [
              {
                path: "",
                element: <AdminDashboardPage />,
              },{
                path: "users",
                element: <Users />,
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
            path: "login",
            element: <UserLoginPage />,
          },
          {
            path: "signUp",
            element: <UserSignUpPage />,
          },
          {
            path: "/",
            element: <ProtectedRoutUser />,
            children: [
              {
                path: "home",
                element: <Home />,
              },
              {
                path: "",
                element: <Home />,
              },
              {
                path: "profile",
                element: <ProfileLPage />,
              },
              {
                path: "profile/:id",
                element: <ProfileLPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
