


import { useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Success({ value }) {
  const history = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value === 'doctor') {
        history('/doctor/appointments');
      } else {
        history('/');
      }
    }, 3000);

    // Clear the timeout when the component unmounts or when value changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]); // Specify value as a dependency

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="text-center" style={{ width: '100%', height: '200px' }}>
        <TiTick style={{ color: 'green', width: '100%', height: '100%' }} />
        <h4>
          {value === 'doctor'
            ? 'Thank you, doctor. Hope you had a good consultation.'
            : 'Appointment booked successfully'}
        </h4>
      </div>
    </div>
  );
}

Success.propTypes = {
  value: PropTypes.string,
};

export default Success;


// import { useEffect } from 'react'
// import { TiTick } from 'react-icons/ti'
// import { useNavigate } from 'react-router-dom'
// import PropTypes from 'prop-types'

// function Success({value}) {

//     const history = useNavigate()

//     useEffect(() => {
//         setTimeout(() => {
//             if(value==='doctor'){
//                 history('/doctor/appointments')
//             }
//             else{
//                 history('/')
//             }
//         }, 3000)

//         return (
//             clearTimeout()
//         )
//     })
//     Success.propTypes = {
//         value: PropTypes.string
//       } 
//       return (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <div className="text-center" style={{ width: "100%", height: "200px" }}>
//                 <TiTick style={{ color: "green", width: "100%", height: "100%" }} />
//                 <h4>
//                     {value === "doctor"
//                         ? "Thank you, doctor. Hope you had a good consultation."
//                         : "Appointment booked successfully"}
//                 </h4>
//             </div>
//         </div>
//     );
    
// }

// export default Success