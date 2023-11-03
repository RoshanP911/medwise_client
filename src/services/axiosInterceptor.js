// Authentication interceptor
import axios from "axios";
import { BASE_URL } from '../config';

const instance = axios.create({
  baseURL: BASE_URL, 
  //  timeout: 5000,
});


instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('usertoken'); 
    const doctorToken = localStorage.getItem('doctortoken')
    const adminToken = localStorage.getItem('admintoken')

    if (userToken) {
      config.headers['Authorization']=`Bearer ${userToken}`
    }
    else if(doctorToken){
      config.headers['Authorization']=`Bearer ${doctorToken}`
    }
    else if(adminToken){
      config.headers['Authorization']=`Bearer ${adminToken}`
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
