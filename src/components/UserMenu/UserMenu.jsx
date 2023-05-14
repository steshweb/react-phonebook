import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from 'redux/auth/authSelectors';
import { authLogOut } from 'redux/auth/authThunk';
import { Button, Typography } from '@mui/material';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClick = () => {
    dispatch(authLogOut());
  };

  return (
    isLoggedIn && (
      <div>
        <Typography
          sx={{
            fontSize: '18px',
            marginRight: '10px',
          }}
          component="span"
        >
          {user.email}
        </Typography>
        <Button color="inherit" onClick={handleClick} variant="outlined">
          Logout
        </Button>
      </div>
    )
  );
};
