import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 5 * (1000 * 60),
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
