import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../Admin/private/Pages/AdminDashboard";
import AdminLoginPage from "../Admin/Public/Pages/AdminLoginPage";

export const AdminRoutes = createBrowserRouter([
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <AdminDashboardPage />,
      },
      {
        path: "login",
        element: <AdminLoginPage />,
      },
    ],
  },
]);
