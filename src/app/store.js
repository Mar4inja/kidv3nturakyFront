// redux/store.js

import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig, authPersistConfig } from './persistConfig';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import registerReducer from '../features/register/RegisterSlice';
import profileReducer from '../features/profile/profileSlice';

import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  register: registerReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
