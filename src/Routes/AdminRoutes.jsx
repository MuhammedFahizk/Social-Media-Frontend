import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../Admin/private/Pages/AdminDashboard";
import AdminLoginPage from "../Admin/Public/Pages/AdminLoginPage";
import ProtectedRoutesAdmin from "../api/ProtectedRoutesAdmin";
import UserLoginPage from "../User/Public/Pages/UserLoginPage";
import UserSignUpPage from "../User/Public/Pages/UserSignUpPage";
export const AdminRoutes = createBrowserRouter([
  {
    path: '/',
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
        path: '/',
        children: [
          {
            path: '/login',
            element: <UserLoginPage />
          },
          {
            path: '/home',
            element: <UserLoginPage />
          },
          {
            path: '/signUp',
            element: <UserSignUpPage
            />
          }
        ]
      }
    ]
  }
]);
