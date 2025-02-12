import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Video APIs
export const uploadVideo = async (formData, onProgress) => {
  const response = await api.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress
  });
  return response.data;
};

export const getVideos = async (page = 1, limit = 10) => {
  const response = await api.get(`/videos?page=${page}&limit=${limit}`);
  return response.data;
};

export const getVideo = async (videoId) => {
  const response = await api.get(`/videos/${videoId}`);
  return response.data;
};

export const likeVideo = async (videoId) => {
  const response = await api.put(`/videos/like/${videoId}`);
  return response.data;
};

export const searchVideos = async (query) => {
  const response = await api.get(`/videos/search/${query}`);
  return response.data;
};

// Comment APIs
export const addComment = async (videoId, text) => {
  const response = await api.post(`/comments/${videoId}`, { text });
  return response.data;
};

export const getComments = async (videoId) => {
  const response = await api.get(`/comments/${videoId}`);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};

// Subscription APIs
export const subscribeToChannel = async (channelId) => {
  const response = await api.put(`/users/subscribe/${channelId}`);
  return response.data;
};

export const getChannel = async (userId) => {
  const response = await api.get(`/users/channel/${userId}`);
  return response.data;
};

// Add more API calls as needed 