import storage from 'redux-persist/lib/storage'; // по умолчанию используется localStorage для веба
import { default as sessionStorage } from 'redux-persist/lib/storage/session'; // по умолчанию используется sessionStorage для веба

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile', 'register'], // Сохранять только эти редюсеры между сессиями
};

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage, // Использовать sessionStorage для данных аутентификации
};

export { persistConfig, authPersistConfig };
