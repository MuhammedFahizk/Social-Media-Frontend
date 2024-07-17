import { RouterProvider } from 'react-router-dom';
import { Routes } from './Routes/Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './User/Store/UserInformation';

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={clientId}>
          <RouterProvider router={Routes} />
          <ToastContainer />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
