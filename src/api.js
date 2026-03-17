import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerDesigner = (data) => API.post('/auth/register', data);
export const loginDesigner = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Rooms
export const getRooms = () => API.get('/rooms');
export const createRoom = (data) => API.post('/rooms', data);
export const updateRoom = (id, data) => API.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

// Furniture
export const getFurniture = () => API.get('/furniture');

// Designs
export const getDesigns = () => API.get('/designs');
export const getDesign = (id) => API.get(`/designs/${id}`);
export const createDesign = (data) => API.post('/designs', data);
export const updateDesign = (id, data) => API.put(`/designs/${id}`, data);
export const deleteDesign = (id) => API.delete(`/designs/${id}`);