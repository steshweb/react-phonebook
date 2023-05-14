import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthToken = token => {
  axios.defaults.headers.common.Authorization = ``;
};

export const authRegister = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', user);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogIn = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post('/users/login', user);
      setAuthToken(resp.data.token);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogOut = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.post('/users/logout');
      clearAuthToken();
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authRefresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token === null) {
      return thunkAPI.rejectWithValue('unable to refresh user');
    }

    try {
      setAuthToken(token);
      const resp = await axios.get('/users/current');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
