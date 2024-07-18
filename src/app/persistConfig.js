import storage from 'redux-persist/lib/storage'; // по умолчанию используется localStorage для веба
import { default as sessionStorage } from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile', 'register', "games"], // Saglabāt šos reducētājus starp sesijām
};

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage, // Izmantot sessionStorage datu autentifikācijai
};

export { persistConfig, authPersistConfig };
