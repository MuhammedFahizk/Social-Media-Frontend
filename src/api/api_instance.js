import axios from "axios"; 

export const adminInstance = axios.create({
    baseURL: 'http://localhost:8080/admin',
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
        }
        
})

// instance.interceptors.request.use(
//     config => {
//         const toke
//     }
// )

export const userInstance = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
        }
})