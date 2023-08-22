import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage'
import {persistReducer , persistStore} from 'redux-persist'

const commomConfig = {
  key : 'shop/user' ,
  storage
}
const userConfig = {
  ...commomConfig ,
  whitelist : ['isLoggedIn' , 'token']
}

export const store = configureStore({
  reducer: {
    app : appSlice ,
    products : productSlice ,
    user : persistReducer(userConfig , userSlice)
  },
});

export const persistor = persistStore(store)