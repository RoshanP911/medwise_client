// Axios interceptor
import axios from "axios";
import { BASE_URL } from '../config';

const instance = axios.create({
  baseURL: BASE_URL, 
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token'); 
    if (accessToken) {
      config.headers['Authorization']=`Bearer ${accessToken}`
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }

)

// Response interceptor 
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('An error occurred:', error);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }

    return Promise.reject(error);
  }
);


 export default instance;
