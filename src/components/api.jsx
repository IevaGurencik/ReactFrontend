import axios from 'axios';

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "13.53.42.0";
const API_BASE = isLocal ? "http://localhost:8080" : `http://${window.location.hostname}:8080`;

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

export default api;