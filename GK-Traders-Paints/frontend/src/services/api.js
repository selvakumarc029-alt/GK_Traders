import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent error handling
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while communicating with the server.';
    return Promise.reject(new Error(message));
  }
);

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProductBySlug = (slug) => API.get(`/products/${slug}`);

// Categories
export const getCategories = () => API.get('/categories');
export const getCategoryBySlug = (slug) => API.get(`/categories/${slug}`);

// Brands
export const getBrands = () => API.get('/brands');
export const getBrandBySlug = (slug) => API.get(`/brands/${slug}`);

// Offers
export const getOffers = (includeExpired = false) =>
  API.get('/offers', { params: { includeExpired } });

// Colours
export const getColours = (params) => API.get('/colours', { params });
export const getColourByCode = (code) => API.get(`/colours/${code}`);

// Blog
export const getBlogPosts = (params) => API.get('/blogs', { params });
export const getBlogPostBySlug = (slug) => API.get(`/blogs/${slug}`);

// Contact & Enquiries
export const submitEnquiry = (enquiryData) => API.post('/enquiries', enquiryData);

// Painter Appointments
export const bookAppointment = (appointmentData) =>
  API.post('/appointments', appointmentData);

// AI Features
export const getAIColourRecommendations = (data) => API.post('/ai/recommend', data);
export const visualizeRoomImage = (formData) =>
  API.post('/ai/visualize', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Store Information & Catalogue
export const getStoreInfo = () => API.get('/store-info');

export default API;
