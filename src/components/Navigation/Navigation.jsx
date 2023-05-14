import { useSelector } from 'react-redux';
import { NavLinkStyle } from './Navigation.styled';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <NavLinkStyle to="/">Home page</NavLinkStyle>
      {isLoggedIn ? (
        <>
          <NavLinkStyle to="/contacts">Contacts</NavLinkStyle>
        </>
      ) : (
        <>
          <NavLinkStyle to="/register">Register</NavLinkStyle>
          <NavLinkStyle to="/login">Login</NavLinkStyle>
        </>
      )}
    </nav>
  );
};
