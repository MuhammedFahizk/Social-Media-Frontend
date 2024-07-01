import {jwtDecode} from "jwt-decode";
import { generateAdminAccessToken } from "../api/auth";


export const validateToken = async (accessToken, refreshToken) => {
  try {

    const decoded = jwtDecode(accessToken); // Use the default import 'jwtDecode'
    
    if (decoded.exp * 1000 < Date.now()) {
      console.log('Token has expired', refreshToken);
      const result = await generateAdminAccessToken(refreshToken);
      console.log(result);
      // Return the new tokens along with the validity status
      return { isValid: false, newAccessToken: result.accessToken, newRefreshToken: result.refreshToken };
    }

    return { isValid: true, newAccessToken: accessToken, newRefreshToken: refreshToken };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { isValid: false, newAccessToken: null, newRefreshToken: null };
  }
};