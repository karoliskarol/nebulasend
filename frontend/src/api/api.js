import axios from "axios";

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'HTTP_X_REQUESTED_WITH': 'xmlhttprequest',
        'Content-Type': 'multipart/form-data'
    }
});

export default api;