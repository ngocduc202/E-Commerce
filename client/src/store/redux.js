import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage'
import {persistReducer , persistStore , FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist'


const commomConfig = {
  key : 'shop/user' ,
  storage
}
const userConfig = {
  ...commomConfig ,
  whitelist : ['isLoggedIn' , 'token' , 'current' , 'currentCart']
}

export const store = configureStore({
  reducer: {
    app : appSlice ,
    products : productSlice ,
    user : persistReducer(userConfig , userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)