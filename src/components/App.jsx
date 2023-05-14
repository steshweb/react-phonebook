import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Layout } from './Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { authRefresh } from 'redux/auth/authThunk';
import { selectIsRefreshing } from 'redux/auth/authSelectors';
import { PublicRoute } from './AuthRoutes/PublicRoute';
import { PrivatRoute } from './AuthRoutes/PrivateRoute';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

export const App = () => {
  const disaptch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    disaptch(authRefresh());
  }, [disaptch]);

  return (
    !isRefreshing && (
      <Layout>
        <Suspense fallback="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="" element={<PublicRoute />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="" element={<PrivatRoute />}>
              <Route path="/contacts" element={<ContactsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    )
  );
};

