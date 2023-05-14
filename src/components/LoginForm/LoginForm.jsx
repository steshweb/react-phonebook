import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogIn } from 'redux/auth/authThunk';
import { TextField, Button, FormHelperText, Typography } from '@mui/material';
import { FormBox } from './LoginForm.styled';
import { selectAuthError } from 'redux/auth/authSelectors';
import { resetErrorAction } from 'redux/auth/authSlice';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(authLogIn({ email, password }));
    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    dispatch(resetErrorAction());
  }, [dispatch]);

  return (
    <div>
      <FormBox onSubmit={handleSubmit}>
        <Typography variant="h5" component="h3" sx={{ fontWeight: '700' }}>
          Login
        </Typography>
        <TextField
          type="text"
          label="email"
          name="email"
          value={email}
          onChange={handleChange}
          size="small"
          required
        />
        <TextField
          type="password"
          name="password"
          label="password"
          onChange={handleChange}
          value={password}
          size="small"
          required
        />
        {error && <FormHelperText error>User not found</FormHelperText>}
        <div>
          <Button type="submit" children="Login" variant="outlined" />
        </div>
      </FormBox>
    </div>
  );
};
