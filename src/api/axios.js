import axios from "axios";

export const API = axios.create({
    baseURL: "https://ch-eating.shop/",
    headers: {
        "Content-Type": "application/json",

    },
    withCredentials: true,
});

API.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );