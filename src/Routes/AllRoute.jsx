import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  {AdminRoutes}  from './AdminRoutes';
import  UserRoutes  from './UserRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Define routes for other users */}
        <Route path="/" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
