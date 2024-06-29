import {  RouterProvider } from 'react-router-dom';
import { AdminRoutes } from './Routes/AdminRoutes';
// import LoginPage from './Admin/Public/Pages/LoginPage';
// import AdminDashboard from './Admin/private/Pages/AdminDashboard';
// import UserLoginPage from './User/Public/Pages/UserLoginPage';
function App() {
  // Define routes
  // const router = createBrowserRouter([
  //   {
  //     path: 'admin/login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: '/admin', 
  //     element: <AdminDashboard />,
  //   },
  //   {
  //     path: '/', 
  //     element: <UserLoginPage />,
  //   }
    
    
  // ]);

  return <RouterProvider router={AdminRoutes} />;
}

export default App;
