import React from "react";
// import Navbar from "../../components/Navbar/Navbar.jsx";
// import Home from "../../components/userComponents/Home/Home.jsx";
import Banner from "../../components/userComponents/Home/Banner.jsx";
import Banner2 from "../../components/userComponents/Home/Banner2.jsx";
import Footer from "../../components/userComponents/Home/Footer.jsx";



const LandingPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Home/> */}
      <Banner/>
      <Banner2/>
      <Footer/>
      
    </div>
  );
};

export default LandingPage;