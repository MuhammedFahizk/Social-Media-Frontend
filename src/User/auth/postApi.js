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