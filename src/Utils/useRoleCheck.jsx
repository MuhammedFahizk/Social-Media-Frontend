import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const useRoleCheck = (requiredRole) => {
  const { userRole } = useContext(AuthContext); // Destructure userRole from AuthContext
  const navigate = useNavigate(); // Initialize navigation

  // Log the user role for debugging
  useEffect(() => {
    console.log(`Current user role: ${userRole}`);
  }, [userRole]);

  useEffect(() => {
    if (!userRole) {
      console.warn('User role is undefined or not available. Redirecting to previous page.');
      navigate(-1); 
    // Redirect to the previous page if userRole is not defined
    } else if (userRole !== requiredRole) {
      console.log(`Redirecting: User role '${userRole}' does not match required role '${requiredRole}'`);
      navigate(-1); // Redirect if the roles do not match
    }
  }, [userRole, requiredRole, navigate]);

  return userRole === requiredRole; // Return true if user role matches required role
};

export default useRoleCheck;
