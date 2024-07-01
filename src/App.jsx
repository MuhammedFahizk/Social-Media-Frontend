import {  RouterProvider } from 'react-router-dom';
import { AdminRoutes } from './Routes/AdminRoutes';

function App() {


  return <RouterProvider router={AdminRoutes} />;
}

export default App;
