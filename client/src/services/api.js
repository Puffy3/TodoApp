import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/';


const api = axios.create({
    baseURL: API_URL,
});


api.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// === AUTH ENDPOINTS ===
export const register = (email, password) => api.post('auth/register', { email, password });
export const login = (email, password) => api.post('auth/login', { email, password });

// === TODO LIST ENDPOINTS ===
export const getLists = () => api.get('todolists');
export const createList = (name) => api.post('todolists', { name });
export const updateList = (listId, data) => api.put(`todolists/${listId}`, data);
export const deleteList = (listId) => api.delete(`todolists/${listId}`);

// === TODO ITEM ENDPOINTS ===
export const addItem = (listId, text) => api.post(`todolists/${listId}/items`, { text });
export const updateItem = (listId, itemId, data) => api.put(`todolists/${listId}/items/${itemId}`, data);
export const deleteItem = (listId, itemId) => api.delete(`todolists/${listId}/items/${itemId}`);

export default api;
