import { userInstance } from "../../Admin/api/api_instance";

export const incrementViewerCount  = async( storyId, authorId ) => {
    try {
  
      const response = await userInstance.post(`/incrementViewerCount/`, {
         storyId,
          authorId
        });
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 


  export const editProfile  = async( data) => {
    try {
  
      const response = await userInstance.post(`/edit-profile/`, data);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const hideContent  = async( data) => {
    try {
  
      const response = await userInstance.post(`/hide-content/`, data);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const unHideContent  = async( data) => {
    try {
  console.log(data);
      const response = await userInstance.post(`/unHide-content/`, data);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const resetPassword = async (data) => {
    try {
      console.log(data);
        const response = await userInstance.post('/reset-password', data);
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};




