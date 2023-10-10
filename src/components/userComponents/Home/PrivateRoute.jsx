import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user,'...userr.................private route.');
  return user ? <Outlet /> : <Navigate to='/login' replace />;
  //if user present ,render the child routes wrapped in an Outlet component or /login
};


export default PrivateRoute;