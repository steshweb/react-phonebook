import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { contactsReducer } from './constats/contactsSlice';
import { initState } from './initState';
import { filterReducer } from './filter/filterSlice';
import { authReducer } from './auth/authSlice';

const inintialState = {
  contacts: initState.contacts,
  filter: initState.filter,
  auth: initState.auth,
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: authReducer,
  },
  devTools: true,
  preloadedState: inintialState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
