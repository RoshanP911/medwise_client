import { useState, useEffect } from 'react';
import { useLocation,Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const PrivateRoute = () => {
  
  const { admin } = useSelector((state) => state.admin);


  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <Loader  />;
  } else {
  return admin ? <Outlet /> : <Navigate to='/admin/login' state={{ from: location }} replace />;
  }
};

//The <Outlet /> component is typically used as a placeholder for nested routes.
export default PrivateRoute;
