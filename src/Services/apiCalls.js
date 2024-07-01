import {jwtDecode} from "jwt-decode";
import { generateAdminAccessToken } from "../api/auth";
import { generateUserAccessToken } from "../api/authUser";

export const validateToken = async (accessToken, refreshToken,) => {
  try {

    const decoded = jwtDecode(accessToken); // Use the default import 'jwtDecode'
    console.log(decoded);
    
    if (decoded.exp * 1000 < Date.now()) {
      console.log('Token has expired', refreshToken);
      
      if (decoded.isAdmin) {
        console.log('User is an admin');
        const result = await generateAdminAccessToken(refreshToken);
        console.log(result);
        // Return the new tokens along with the validity status
        return { isValid: false, newAccessToken: result.accessToken};
      } else {
        const result = await generateUserAccessToken(refreshToken)
        console.log('recreate access', result);
        console.log('User is not an admin');
        return { isValid: false, newAccessToken: result.accessToken };

      }
      }

    return { isValid: true, newAccessToken: accessToken, newRefreshToken: refreshToken };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { isValid: false, newAccessToken: null, newRefreshToken: null };
  }
};
