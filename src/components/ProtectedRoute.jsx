import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDemo = useSelector((state) => state.auth.isDemo);

  const justLoggedOut = useSelector((state) => state.auth.justLoggedOut);

  const redirectPath = justLoggedOut ? "/auth" : "/home";

  return isLoggedIn || isDemo ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
