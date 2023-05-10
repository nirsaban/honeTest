import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import companiesPerformanceSlice from './companyPerformance';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  loader: loaderReducer,
  companiesPerformance: companiesPerformanceSlice
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
