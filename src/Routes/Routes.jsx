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
import Posts from "../Admin/private/Pages/Posts";
import BlogPageAdmin from "../Admin/private/Pages/BlogPageAdmin";
import EditPage from "../User/Pages/EditPage";
import Message from "../User/Pages/Message";

import Notification from "../Admin/private/Pages/Notification";
import EditProfile from "../User/Pages/EditProfile";
import EditPassword from "../User/specific/Settings/EditPassword";
import EditProfileForm from "../User/specific/Settings/EditProfileForm!";
import HidePosts from "../User/specific/Settings/HidePosts";
import HideUsers from "../User/specific/Settings/HideUsers";
import Stories from "../User/Pages/Stories";
import Reports from "../Admin/private/Pages/Reports";

export const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        // element: <AdminAuthorization/>,
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
                path: "posts",
                element: <Posts />,
              },
              {
                path: "reports",
                element: <Reports />,
              },
              {
                path: "user/:id",
                element: < UserPage/>,
              },
              {
                path: "blog/:id",
                element: < BlogPageAdmin/>,
              },
              {
                path: "notification",
                element: <Notification />,
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
        // element: <UserAuthorization />,
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
                path: "editPost/:id",
                element: <EditPage />,
              },
              {
                path: "blog/:id",
                element: < BlogPage/>,
              },
              {
                path: "messages",
                element: <Message />,
              },
              {
                path: "stories/:userName/:storyId",
                element: <Stories />, 
              },              
              {
                path: "profile-settings",
                element: <EditProfile />,
                children: [
                  {
                    path: "",
                    element: <EditProfileForm />, // Default child route
                  },
                  {
                    path: "password",
                    element: <EditPassword />, // Nested route for password change
                  },
                  {
                    path: "hide-posts",
                    element: <HidePosts />, // Route for hiding posts
                  },
                  {
                    path: "hide-users",
                    element: <HideUsers />, // Route for hiding users
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);