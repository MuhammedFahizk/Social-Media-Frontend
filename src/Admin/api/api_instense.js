import axios from "axios"; 

const instance = axios.create({
    baseURL: 'http://localhost:8080/admin',
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
        }
        
})

export default instance;