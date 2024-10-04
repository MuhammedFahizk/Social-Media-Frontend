import { userInstance } from "../../Admin/api/api_instance";

export const deleteComment  = async( commentId, postId ) => {
    try {
        console.log('commentId', commentId);
        console.log('postId', postId);
      const response = await userInstance.delete(`/deleteComment/`,
        {
            params: {
                commentId, 
                postId
            }
        }
      );
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
}

export const clearChat = async (friendId) => {
  try {
    const response = await userInstance.delete(`/clearChat`, {
      params: { friendId }  
    });
    return response.data;  
  } catch (error) {
    console.error('Error clearing chat:', error);
    throw error; 
  }
};

export const deleteForMe = async(messageId) => {
  try {
    const response = await userInstance.delete(`/deleteForMe`, {
      params: { messageId }  
    });
    return response.data;  
  } catch (error) {
    console.error('Error clearing chat:', error);
    throw error; 
  }
}


export const deleteForEveryone = async(messageId) => {
  try {
    const response = await userInstance.delete(`/deleteForEveryone`, {
      params: { messageId }  
    });
    return response.data;  
  } catch (error) {
    console.error('Error clearing chat:', error);
    throw error; 
  }
}
