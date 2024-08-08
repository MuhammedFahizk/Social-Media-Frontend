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