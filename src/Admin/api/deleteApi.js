import { adminInstance } from "./api_instance";

export const deletePost = async(postId,reportId ,comment) => {
    const url = `/reports/${reportId}/${postId}/delete-post`;
    return await adminInstance.put(url, {
      comment,
    });
  };