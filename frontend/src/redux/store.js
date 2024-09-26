import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import userSlice from './userSlice';
import { version } from 'react';
import storage from 'redux-persist/lib/storage';
import userMenuSlice from './userMenuSlice';
import adminMenuSlice from './adminMenuSlice';
 
const persistConfig={
    key:'root',
    version:1,
    storage
}

const rootReducer=combineReducers({
    user:userSlice,
    userMenu:userMenuSlice,
    adminMenu:adminMenuSlice,
});

const persitedReducer=persistReducer(persistConfig,rootReducer);

const store=configureStore({
    reducer:persitedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        }),
});

export default store;