import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is correctly imported
import { generateAdminAccessToken } from "../api/auth";
import { generateUserAccessToken } from "../api/authUser";

export const validateToken = async (accessToken, refreshToken, isAdmin, role) => {
  try {
    const decoded = jwtDecode(accessToken);
    console.log(decoded);

    // Check if the token has expired
    if (decoded.exp * 1000 < Date.now()) {
      console.log("Token has expired", refreshToken);

      if (isAdmin && role === "admin") {
        console.log("User is an admin");
        const result = await generateAdminAccessToken(refreshToken);
        console.log(result);
        return {
          isValid: false,
          newAccessToken: result.accessToken,
          newRefreshToken: refreshToken,
        };
      } else if (!isAdmin && role !== "admin") {
        console.log("User is not an admin");
        const result = await generateUserAccessToken(refreshToken);
        console.log("Recreated access", result);
        return {
          isValid: false,
          newAccessToken: result.accessToken,
          newRefreshToken: refreshToken,
        };
      }
    } else {
      if (isAdmin && role === "admin") {
        console.log("Token is valid and user is an admin");
        return { isValid: true, newAccessToken: accessToken, newRefreshToken: refreshToken };
      } else if (!isAdmin && role !== "admin") {
        console.log("Token is valid and user is not an admin");
        return { isValid: true, newAccessToken: accessToken, newRefreshToken: refreshToken };
      }
    }

    // If the role does not match, return invalid
    console.log("Token or role mismatch");
    return { isValid: false, newAccessToken: null, newRefreshToken: null };
  } catch (error) {
    console.error("Error decoding token:", error);
    return { isValid: false, newAccessToken: null, newRefreshToken: null };
  }
};
