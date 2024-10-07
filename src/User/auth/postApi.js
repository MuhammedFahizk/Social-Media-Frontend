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

export const reportPost = async (data) => {
  try {
    console.log(data);
      const response = await userInstance.post('/report-post', data);
      return response.data;
  } catch (error) {
      console.error("Error resetting password:", error);
      throw error.response ? error.response.data : new Error(error.message);
  }
};



export const postChatMessage = async (receiverId, formData) => {
  try {
    const response = await userInstance.post(`/chats/${receiverId}/messages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure multipart content type
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting chat message:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};



export const messageRead = async (messageId) => {
  try {
    const response = await userInstance.post(`/chats/read`, {
      messageId, 
    });
    return response.data;
  } catch (error) {
    console.error("Error marking chat message as read:", error);
    throw error.response ? error.response.data : new Error("An error occurred while updating the message status.");
  }
};





