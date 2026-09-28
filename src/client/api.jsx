import axios from 'axios';

export const API_BASE = process.env.REACT_APP_HTTP_PROXY

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

export default api;