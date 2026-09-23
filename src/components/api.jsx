import axios from 'axios';

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "16.192.224.87";
export const API_BASE = isLocal ? "http://localhost:8080" : `http://${window.location.hostname}:8080`;

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

export default api;