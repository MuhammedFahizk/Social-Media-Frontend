import { userInstance } from "../../Admin/api/api_instance";


export const updatePost  = async( postId, data ) => {
    try {
  
      const response = await userInstance.put(`/updatePost/`, {
        postId,
        data
        });
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 