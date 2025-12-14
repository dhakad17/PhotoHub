import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8080/auth';
const MEDIA_API_URL = 'http://localhost:8082';

// Create axios instances
const authApi = axios.create({
    baseURL: AUTH_API_URL,
});

const mediaApi = axios.create({
    baseURL: MEDIA_API_URL,
});

// Add token to media API requests
mediaApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Media Service APIs
export const mediaService = {
    // Upload media
    uploadMedia: async (file, albumId = null) => {
        const formData = new FormData();
        formData.append('file', file);
        if (albumId) {
            formData.append('albumId', albumId);
        }
        const response = await mediaApi.post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Get user's media
    getMyMedia: async () => {
        const response = await mediaApi.get('/media/my-media');
        return response.data;
    },

    // Get album media
    getAlbumMedia: async (albumId) => {
        const response = await mediaApi.get(`/media/album/${albumId}`);
        return response.data;
    },

    // Delete media
    deleteMedia: async (mediaId) => {
        const response = await mediaApi.delete(`/media/${mediaId}`);
        return response.data;
    },
};

// Album Service APIs
export const albumService = {
    // Create album
    createAlbum: async (name) => {
        const response = await mediaApi.post('/albums', { name });
        return response.data;
    },

    // Get user's albums
    getMyAlbums: async () => {
        const response = await mediaApi.get('/albums');
        return response.data;
    },

    // Delete album
    deleteAlbum: async (albumId) => {
        const response = await mediaApi.delete(`/albums/${albumId}`);
        return response.data;
    },
};

// Auth Service APIs
export const authService = {
    register: async (userData) => {
        const response = await authApi.post('/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await authApi.post('/login', credentials);
        return response.data;
    },

    sendOtp: async (email) => {
        const response = await authApi.post('/otp/send', { email });
        return response.data;
    },

    loginWithOtp: async (email, otp) => {
        const response = await authApi.post('/otp/login', { email, otp });
        return response.data;
    },
};

// Auth helpers
export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const removeAuthToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};
