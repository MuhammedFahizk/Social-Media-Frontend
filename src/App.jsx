import { RouterProvider } from 'react-router-dom';
import { Routes } from './Routes/Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './User/Store/UserInformation';
import { createContext, useState } from 'react';
import Loading from './User/component/Loading';

export const AuthContext = createContext();

function App() {
  const [userRole, setUserRole] = useState(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}> {/* Show Loading during persistence */}
        <GoogleOAuthProvider clientId={clientId}>
          <AuthContext.Provider value={{ userRole, setUserRole }}>
            <RouterProvider router={Routes} />
            <ToastContainer />
          </AuthContext.Provider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
