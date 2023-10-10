// Authentication interceptor
import axios from "axios";
import { BASE_URL } from '../config';





const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000,
});



instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('usertoken'); 
    const doctorToken = localStorage.getItem('doctortoken')
    const adminToken = localStorage.getItem('admintoken')

    if (userToken) {
      console.log(userToken,'.........userToken frm axios');
      config.headers['Authorization']=`Bearer ${userToken}`
    }
    else if(doctorToken){
      console.log(doctorToken,'.............doctorToken frm axios');
      config.headers['Authorization']=`Bearer ${doctorToken}`
    }
    else if(adminToken){
      console.log(adminToken,'.............adminToken frm axios');
      config.headers['Authorization']=`Bearer ${adminToken}`
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }

)

export default instance;
