import { adminInstance } from "./api_instance";

export const usersList = async () => {
    try {
      const response = await adminInstance.get("users");
      return response.data.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  
  export const fetchUser = async (id) => {
    try {
      const response = await adminInstance.get(`users/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  }
  export const blockUser = async (id) => {
    try {
      const response = await adminInstance.get(`blockUser/${id}`);
      return response;
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  }
  
  export const unblockUser = async (id) => {
    try {
      const response = await adminInstance.get(`unblockUser/${id}`);
      return response;
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  }


  export const FetchPosts = async (value, search) => {
    try {
      const response = await adminInstance.get(`fetchPosts/${value}`, {
        params: { search }
      });
      return response;
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };

  export const fetchPost = async (postId) => {
    try {
      const response = await adminInstance.get(`fetchPost/${postId}`);
      return response;
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  
  