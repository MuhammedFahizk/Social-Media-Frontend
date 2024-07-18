import { userInstance } from "../../api/api_instance";

export const loginUser = async (data) => {
  try {
    const response = await userInstance.post("/login", data);
    console.log("Response ", response);
    return response;
  } catch (error) {
    console.log("Error of axi ", error);
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
};

export const otpValidation = async (data) => {
  try {
    const response = await userInstance.post("/otpValidation", data);
    console.log("Response ", response);
    return response.data;
  } catch (error) {
    console.log("Error  axi", error.response.data);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
export const userLoginWithGoogle = async (googleData) => {
  try {
    const response = await userInstance.post("loginWithGoogle", googleData);
    console.log("response :", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const verifyUser = async () => {
  try {
    const response = await userInstance.post("verifyUser");
    console.log("response fahiz :", response);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const LogOutUser = async () => {
  try {
    const response = await userInstance.post("/logOutUser");
    console.log("response fahiz :", response);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const HomePage = async () => {
  try {
    const response = await userInstance.get('/homePage');
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
}
export const followUser = async (id) => {
  try {
    const response = await userInstance.get(`/followUser/${id}`);
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  } 
}

export const unFollowUser = async (id) => {
  try {
    const response = await userInstance.get(`/UnFollowUser/${id}`);
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  } 
}
export const profilePage = async (id) => {
  try {
    if (!id) {
    console.log(id);
    const response = await userInstance.get(`/profile`);
console.log("response profile page :", response);
return response;
    }
    const response = await userInstance.get(`/profile/${id}`);
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  } 
}