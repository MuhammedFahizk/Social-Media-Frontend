import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../Admin/private/Pages/AdminDashboard";
import AdminLoginPage from "../Admin/Public/Pages/AdminLoginPage";
import ProtectedRoutesAdmin from "../Admin/util/ProtectedRoutesAdmin";
import UserLoginPage from "../User/Pages/UserLoginPage";
import UserSignUpPage from "../User/Pages/UserSignUpPage";
import ProtectedRoutUser from "../User/Utils.js/ProtectedRoutUser";
import Home from "../User/Pages/Home";
import ProfileLPage from "../User/Pages/ProfileLPage";
import Users from "../Admin/private/Pages/Users";
import UserPage from "../Admin/private/Pages/UserPage";
import AddPost from "../User/Pages/AddPost";
import Search from "../User/Pages/Search";
import BlogPage from "../User/Pages/BlogPage";
export const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        // element: <AdminLayout/>,
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
              {
                path: "user/:id",
                element: < UserPage/>,
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
                path: "addPost",
                element: <AddPost/>
              },
              {
                path: "search",
                element: <Search/>
              },
              {
                path: "profile/:id",
                element: <ProfileLPage />,
              },
              {
                path: "blog/:id",
                element: < BlogPage/>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
