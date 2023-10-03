import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { doctor } = useSelector((state) => state.doctor);
  return doctor ? <Outlet /> : <Navigate to='/doctor/login' replace />;
};


export default PrivateRoute;