import axios from "axios";

const API = axios.create ({
    baseURL: 'https://task-manager-backend-mswf.onrender.com',
})

export default API;