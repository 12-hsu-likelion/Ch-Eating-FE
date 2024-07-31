import axios from "axios";

export const API = axios.create({
    baseURL: "http://43.201.132.101:8080/",
    headers: {
        "Content-Type": "application/json",

    },
    withCredentials: true,
});

API.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );