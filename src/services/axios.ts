import axios from "axios";
import { API_URL } from "@/config/api";

const baseURL = API_URL;

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if ( token ) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     }
// );

// export const apiLogin = axios.create({
//     baseURL: 'http://181.224.242.66:8080/cixdwp/api',
//     headers: {
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest'
//     }
// })