import { userInstance } from "../../api/api_instance";

export const loginUser = async (data) => {
  try {
    const response = await userInstance.post("/login", data);
    console.log("Response ", response);
    return response;
  } catch (error) {
    console.log("Error of axi ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const SignUpUser = async (data) => {
  try {
    const response = await userInstance.post("/signUp", data);
    console.log("Response ", response);
    return response.data;
  } catch (error) {
    console.log("Error  axi", error.response.data);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const otpValidation = async (data) => {
  try {
    const response = await userInstance.post("/otpValidation", data);
    console.log("Response ", response);
    return response.data;
  } catch (error) {
    console.log("Error  axi", error.response.data);
    throw error.response ? error.response.data : new Error(error.message);
  }
};
export const userLoginWithGoogle = async (googleData) => {
  try {
    const response = await userInstance.post("loginWithGoogle", googleData);
    console.log("response :", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const verifyUser = async () => {
  try {
    const response = await userInstance.post("verifyUser");
    console.log("response fahiz :", response);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const LogOutUser = async () => {
  try {
    const response = await userInstance.post("/logOutUser");
    console.log("response fahiz :", response);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const HomePage = async () => {
  try {
    const response = await userInstance.get('/homePage');
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
}
export const followUser = async (id) => {
  try {
    const response = await userInstance.get(`/followUser/${id}`);
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  } 
}

export const unFollowUser = async (id) => {
  try {
    const response = await userInstance.get(`/UnFollowUser/${id}`);
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  } 
}
export const profilePage = async (id) => {
  try {
    if (!id) {
    console.log(id);
    const response = await userInstance.get(`/profile`);
console.log("response profile page :", response);
return response;
    }
    const response = await userInstance.get(`/profile/${id}`);
    console.log("response Home page :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  } 
}
export const searchUsers = async (searchValue, item, offset) => {
  try {
    console.log('item',item);
    console.log('searchValue', searchValue);
    const response = await userInstance.get(`/search/${searchValue}`, { params: { item , offset} }); // Adjust the request method as necessary
    console.log("response search users :", response);
    return response;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const uploadPhoto = async (blob) => {
  const formData = new FormData();
  formData.append('file', blob, 'cropped-image.png'); // Give the blob a filename

  try {
    const response = await userInstance.post('/profile/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.response;
  } catch (error) {
    console.error('Error:', error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const createPost = async( data, content) => {
  try {
    console.log(data);
    const response = await userInstance.post(`/createPost/${content}`, data)
    console.log("response createPost users :", response);
    return response
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);

  }
} 
export const createStory = async( data, content) => {
  try {
    console.log(data);
    const response = await userInstance.post(`/createStory/${content}`, data)
    console.log("response createStory users :", response);
    return response
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);

  }
} 
export const uploadImageCloud = async( formData ) => {
  try {
    console.log(formData);
    const response = await userInstance.post('/uploadImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });    console.log("response upload image users :", response);
    return response
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);

  }
} 

export const deleteImageCloud = async( url ) => {
  try {
    console.log(url);
    const payload = { url };

    const response = await userInstance.post('/deleteImage', payload,);
    console.log("response delete image users :", response);
    return response
  } catch (error) {
    console.error("Error: ", error);
    throw error.response ? error.response.data : new Error(error.message);

  }
} 
