import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from 'redux/auth/authThunk';
import { FormBox } from './RegisterForm.styled';
import { resetErrorAction } from 'redux/auth/authSlice';
import { selectAuthError } from 'redux/auth/authSelectors';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectAuthError);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

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

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(authRegister({ name, email, password }));
    reset();
  };

  const reset = () => {
    setName('');
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
          Registration
        </Typography>
        <TextField
          type="text"
          label="Name"
          name="name"
          onChange={handleChange}
          value={name}
          size="small"
        />

        <TextField
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={email}
          size="small"
        />

        <TextField
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={password}
          size="small"
        />
        {error && <FormHelperText error>Invalid user data</FormHelperText>}

        <div>
          <Button type="submit" children="Register" variant="outlined" />
        </div>
      </FormBox>
    </div>
  );
};
