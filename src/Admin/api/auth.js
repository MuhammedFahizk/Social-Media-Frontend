import instance  from "./api_instense";

export const loginAdmin =  async (data) => {
    try {
        const response = await instance.post('/login', data)
        console.log('Response ',response);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');

    }
}

