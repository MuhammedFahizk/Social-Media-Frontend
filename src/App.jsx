import {  RouterProvider } from 'react-router-dom';
import { Routes } from './Routes/Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

function App() {



  return (

  <GoogleOAuthProvider clientId="52712851092-qm8gt1v43trspla3biv0c1oibkemcrjc.apps.googleusercontent.com">
  
    <RouterProvider router={Routes} />
    <ToastContainer 
    
    />

</GoogleOAuthProvider>
  )
}

export default App;
