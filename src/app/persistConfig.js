import storage from 'redux-persist/lib/storage'; // Lieto localStorage
import { default as sessionStorage } from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile', 'register', 'games'], // Saglabāt šos reducētājus
};

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage, // Izmantot sessionStorage datu autentifikācijai
};

export { persistConfig, authPersistConfig };
