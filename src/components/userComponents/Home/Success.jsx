


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

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]); 

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
