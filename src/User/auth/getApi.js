import { userInstance } from "../../Admin/api/api_instance";


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

  export const getFreshStories  = async() => {
    try {
  
      const response = await userInstance.get(`/getFreshStories`);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const fetchProfileStores  = async(userId) => {
    try {
  
      const response = await userInstance.get(`/fetchProfileStores/${userId}`);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const fetchPost = async( id,  ) => {
    try {
  
      const response = await userInstance.get(`/post/${id}`,);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 
   export const fetchSuggestions = async( offset) => {
    try {
  
      const response = await userInstance.get(`/fetchSuggestions/${offset}`,);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 
  
  export const fetchUserNotifications = async() => {
    try {
  
      const response = await userInstance.get(`/fetchUserNotifications`,);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 


  export const fetchHideUsers = async() => {
    try {
  
      const response = await userInstance.get(`/hide-users`,);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const fetchHidePosts = async() => {
    try {
  
      const response = await userInstance.get(`/hide-posts`,);
      return response
    } catch (error) {
      console.error("Error: ", error);
      throw error.response ? error.response.data : new Error(error.message);
  
    }
  } 

  export const fetchUserChat = async (userId) => {
    try {
      const response = await userInstance.get(`/chats/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching user chat:", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };

  export const fetchChatList = async () => {
    try {
      const response = await userInstance.get(`/friends`);
      console.log('response',response);
      
      return response;
    } catch (error) {
      console.error("Error fetching user chat:", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  