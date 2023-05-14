import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

export const PrivatRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
