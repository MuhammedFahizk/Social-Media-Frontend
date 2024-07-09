import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

function App() {
  console.log(import.meta.env.VITE_SOME_KEY) // "123"
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log('clientId', clientId);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={Routes} />
      <ToastContainer />
    </GoogleOAuthProvider>
  );
}

export default App;
