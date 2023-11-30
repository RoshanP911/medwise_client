import React from "react";
import "./ErrorPage.css";
const ErrorPage = () => {
  return (
    <>
      <div class="error">404</div>
      <br />
      <br />
      <span class="info">Page not found</span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        class="static"
        alt="error"
      />
    </>
  );
};

export default ErrorPage;
