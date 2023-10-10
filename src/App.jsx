import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { Toaster } from "react-hot-toast";
import Admin from './Routes/Admin.jsx'
import User from './Routes/User.jsx'
import Doctor from "./Routes/Doctor.jsx";
// import { useSelector } from "react-redux";
// import { CircularProgress } from "@mui/material";
// import { AppContext } from "./context/AppContext.js";


function App() {

  // const [progress] = React.useState(75);
  // const {loading}= useSelector(state=>state.alerts)


  return (
    <>
    {/* <AppContext.Provider value={{
    }}> */}



      <BrowserRouter>
      {/* {console.log(loading,'loadingggg')}

      {loading&& (<div className="spinner-parent">
      <CircularProgress variant="determinate" value={progress}   />
      </div>)} */}


      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <Routes>
          {/* FRONTEND ROUTES  */}
          <Route path='/*' element={<User />} />
          <Route path='/doctor/*' element={<Doctor />} />
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
      </BrowserRouter>



      {/* </AppContext.Provider> */}

    </>
  );
}

export default App;



