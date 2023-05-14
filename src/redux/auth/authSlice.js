import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import { initState } from 'redux/initState';
import { authLogIn, authLogOut, authRefresh, authRegister } from './authThunk';

const getRejected = (state, { payload }) => {
  state.error = payload;
};

const getFulfilledLoginRegister = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState.auth,
  reducers: {
    resetErrorAction: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authRegister.fulfilled, getFulfilledLoginRegister)
      .addCase(authRegister.rejected, getRejected)
      .addCase(authLogIn.fulfilled, getFulfilledLoginRegister)
      .addCase(authLogIn.rejected, getRejected)
      .addCase(authLogOut.fulfilled, state => {
        state.user = { email: null, password: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authRefresh.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(authRefresh.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(authRefresh.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const { resetErrorAction } = authSlice.actions;

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
