import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../Admin/private/Pages/AdminDashboard";
import AdminLoginPage from "../Admin/Public/Pages/AdminLoginPage";
import ProtectedRoutesAdmin from "../Admin/util/ProtectedRoutesAdmin";
import UserLoginPage from "../User/Pages/UserLoginPage";
import UserSignUpPage from "../User/Pages/UserSignUpPage";
import ProtectedRoutUser from "../User/Utils.js/ProtectedRoutUser";
export const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        children: [
          {
            path: "login",
            element: <AdminLoginPage />,
          },
          {
            path: "",
            element: <ProtectedRoutesAdmin />,
            children: [
              {
                path: "",
                element: <AdminDashboardPage />,
              },
            ],
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
            path: "",
            element: <ProtectedRoutUser />,
            children: [
              {
                path: "/home",
                element: <h1>Home</h1>,
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
