// Axios interceptor
import axios from "axios";
import { BASE_URL } from '../config';
import toast from "react-hot-toast";


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

    // if (error.response) {
    //   console.error('Status:', error.response.status);
    //   console.error('Data:', error.response.data);
    // }
    if (error.response.status === 403) {
      // toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
      toast.error(error.response.data.message);
      localStorage.removeItem('token')
      window.location.href = '/login';
    }
    else{
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);





 export default instance;









 