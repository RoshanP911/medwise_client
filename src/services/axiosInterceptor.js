import axios from "axios";
import { BASE_URL } from '../config';

const instance = axios.create({
  baseURL: BASE_URL,  //port of server
  timeout: 5000,
});



// User authentication interceptor
instance.interceptors.request.use(
  (config) => {
    const usertoken = localStorage.getItem('usertoken'); // You can use cookies or any other storage method as well
    if (usertoken) {
      config.headers['Authorization'] = `Bearer ${usertoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Doctor authentication interceptor
instance.interceptors.request.use(
  (config) => {
    const doctortoken = localStorage.getItem('doctortoken');
    if (doctortoken) {
      config.headers['Authorization'] = `Bearer ${doctortoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;



















//   // dataCall()
//   const dataCall=async()=>{
// const doctortoken=localStorage.getItem('doctortoken')
// const admintoken=localStorage.getItem('admintoken')

// if(doctortoken){
//   axios.defaults.headers.common['Authorization']=`Bearer ${doctortoken}` 
//   await axios.get()
// }
//   }


// axios.interceptors.request.use(config => {
//   // Modify the request config before sending
//   config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
//   return config;
// }, error => {
//   return Promise.reject(error);
// });