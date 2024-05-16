import { createSlice, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    restoInfo: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    setRestoInfo: (state, action) => {
      state.restoInfo = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.restoInfo = null;
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

const { actions, reducer } = authSlice;
export const { loginSuccess, setRestoInfo, logout, setLoading, setError } = actions;

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer
  }
});

export const persistor = persistStore(store);
export default store;
