import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

export const PublicRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/contacts" replace /> : <Outlet />;
};
