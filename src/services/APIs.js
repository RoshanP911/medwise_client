import axios from "../services/axiosInterceptor";
import Axios from 'axios';
// ADMIN API CALLS
export const addDepartment = async (departmentData) => {
  return axios.post(`/admin/add_department`, departmentData);
};

export const uploadImage = async (formData) => {
  return Axios.post(`https://api.cloudinary.com/v1_1/dipnk9uvd/image/upload`, formData)
};

export const departmentList = async () => {
  return axios.get(`/admin/departments`);
};

export const userList = async () => {
  return axios.get(`/admin/users`);
};

export const doctorList = async () => {
  return axios.get(`/admin/doctors`);
};

export const doctorBlockUnblock = async (data) => {
  return axios.post(`/admin/blockDoctor`, data);
};

export const approveDoctor = async (data) => {
  return axios.post(`/admin/approveDoctor`, data);
};

export const documentDownload = async (data) => {
  return axios.post(`/admin/doc-document`, data);
};


//USER API CALLS
export const findDoctors = async () => {
    return axios.get(`/find-doctors`);
  };

  export const Register = async (value,values) => {
    return axios.post(value==='doctor'?"/doctor/register":"/register",values);
  };

  export const SignIn = async (value,values) => {
    return axios.post(value==='doctor'?"/doctor/login":value==='admin'?"/admin/login":"/login",values);
  };

 export const OTPSend = async (value,ootp,state) => {
    return axios.post(value==='doctor'?"doctor/otp":"/otp",{ootp,state});
  };

  export const OTPResend = async (value,state) => {
    return axios.post(value==='doctor'?"doctor/resend-otp":"/resend-otp",state);
  };

  export const forgotPassword  = async (value) => {
    return axios.post("/forgot-password",value);
  };

  export const Appointments  = async (userId) => {
    return axios.post('/appointments',{userId:userId});
  };

  export const cancelAppointment  = async (apptId) => {
    return axios.post('/cancel-appointment',{apptId:apptId});
  };

  export const singleDoctorDetails  = async (id) => {
    return axios.get(`/singleDoctorDetails/${id}`);
  };

  export const createCheckoutSession  = async (response) => {
    return axios.post(`/create-checkout-session`,{ response });
  };




//DOCTOR API CALLS
export const getSpecialisations= async () => {
  return axios.get('/doctor/getSpecialisations');
};

export const docAppointments  = async (doctorId) => {
  return axios.post('/doctor/appointments',{doctorId:doctorId});
};

export const cancelDocAppointment  = async (apptId) => {
  return axios.post('/doctor/cancel-docappointment',{apptId:apptId});
};



