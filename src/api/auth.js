import {adminInstance} from "./api_instance";

export const loginAdmin = async (data) => {
  try {
    const response = await adminInstance.post("/login", data, { withCredentials: true });
    console.log("Response ", response);
    return response.data;
  } catch (error) {
    console.log("Error ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const generateAdminAccessToken = async (refreshToken) => {
    try {
        console.log(refreshToken, 'refresh token api');
        const response = await adminInstance.post("/generateAccessToken", { refreshToken });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};

export const adminLoginWithGoogle = async (googleData) => {
  try {
    const response = await adminInstance.post('loginWithGoogle',googleData )
    console.log('response :', response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
}

export const verifyAdmin = async () => {
  try {
    const response = await adminInstance.post('verifyAdmin' )
    console.log('response Admin :', response);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
}
