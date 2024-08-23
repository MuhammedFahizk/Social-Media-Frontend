import axios from "axios"; 

export const adminInstance = axios.create({
    baseURL: 'http://localhost:8080/admin',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
        }
        
})



export const userInstance = axios.create({
    baseURL: 'http://localhost:8080/user', // Base URL for your API
    withCredentials: true, // Ensure cookies are sent with requests if needed
    headers: {
        'Content-Type': 'application/json', // Specify the content type for requests
    },
    timeout: 10000, // Set timeout for requests (in milliseconds)
});
