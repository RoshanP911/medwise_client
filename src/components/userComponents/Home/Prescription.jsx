

import React, { useCallback, useEffect, useState } from "react";
import DownloadButton from './Download';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/axiosInterceptor";
import Loader from "../../Loader";

function Prescription() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const id = userData.user._id;
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const DataCall = useCallback(async () => {
    try {
      const res = await axios.post(`/prescription`, { id });
      setPrescriptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    DataCall();
  }, [DataCall]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="text-center m-5"
        style={{
          border: "1px solid rgb(219, 217, 217)",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
          width: "80%",
          backgroundColor: "light",
          padding: "20px",
        }}
      >
        <h1 style={{ fontFamily: "Times New Roman, serif" }}>Prescriptions</h1>
        {Array.isArray(prescriptions) && prescriptions.length > 0 ? (
          prescriptions.map((el, index) => (
            <div key={index} className="card mb-4">
              <div className="row">
                <div className="col-md-4">
                  <h4>Dr. {el.doctorId.name}</h4>
                  <p>{el.slot}</p>
                </div>
                <div className="col-md-4">
                  {el.medicines && el.medicines.length > 0 ? (
                    <div>
                      <b>Medicine:</b>
                      <p>{el.medicines[0].medicine || "N/A"}</p>
                      <b>Description:</b>
                      <p>{el.medicines[0].selectedDose || "N/A"}</p>
                    </div>
                  ) : (
                    <p>No medication data available</p>
                  )}
                </div>
                <div className="col-md-2 mt-4 ">
                  {el.medicines && <DownloadButton el={el} user={id} />}
                  <p>Download</p>
                </div>
                <div className="col-md-2">
                  <img
                    src="appointme.avif"
                    alt=""
                    style={{ height: "150px", maxWidth: "100%" }}
                  />
                </div>
              </div>
            </div>
          )
          )
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
}

export default Prescription;
