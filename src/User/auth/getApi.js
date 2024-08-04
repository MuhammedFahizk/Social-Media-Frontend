import { userInstance } from "../../api/api_instance";


export const fetchConnections  = async(id , type , offset, query) => {
    try {
  
      const response = await userInstance.get(`/connections/${id}`, {
        params: {
           offset, type, query
        }
      });
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 