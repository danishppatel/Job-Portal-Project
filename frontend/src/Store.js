import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Import session storage
import todoSlicer from './todoSlicer';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persisted data
  storage: storage, // Using session storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, todoSlicer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// // Create a persistor object
export const persistor = persistStore(store);