import { userInstance } from "./api_instance";


export const loginUser = async (data) => {
try {
        const response = await userInstance.post("/login", data);
        console.log("Response ", response);
        return response;
} catch (error) {
    console.log("Error of axi ", error);
    throw error.response ? error.response.data : new Error(error.message);
}
}

export const generateUserAccessToken = async (refreshToken) => {
    try {
        console.log(refreshToken, 'refresh token api');
        const response = await userInstance.post("/generateAccessToken", { refreshToken });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
        throw error.response ? error.response.data : new Error(error.message);
    }
  };

export const SignUpUser = async (data) => {
    try {
            const response = await userInstance.post("/signUp", data);
            console.log("Response ", response);
            return response.data;
    } catch (error) {
        console.log("Error  axi", error.response.data);
        throw error.response ? error.response.data : new Error(error.message);
    }
    }