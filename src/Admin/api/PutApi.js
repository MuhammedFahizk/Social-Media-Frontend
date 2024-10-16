// reportApi.js
import { adminInstance } from "./api_instance"; // Make sure to import your axios instance

export const resolveReport = async (postId,reportId, comment) => {
    const url = `/reports/${reportId}/${postId}/ban-user`;
    return await adminInstance.put(url, {
      comment,
    });
  };
  

  export const dismissReport = async (postId,reportId ,comment) => {
    const url = `/reports/${reportId}/${postId}/dismiss`;
    return await adminInstance.put(url, {
      comment,
    });
  };

