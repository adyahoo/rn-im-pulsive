/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

import authReducer from '../reducers/authReducer';
import {combineReducers} from 'redux';
import {mapReducer} from '../reducers/mapReducer';
import splashReducer from '../reducers/splashReducer';
import {PersistConfig} from 'redux-persist/es/types';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import themeReducer from '../reducers/themeReducer';
import expenseReducer from '../reducers/expenseReducer';

const persistConfig: PersistConfig<unknown> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['splashReducer'],
};

export const rootReducer = combineReducers({
  authReducer,
  mapReducer,
  splashReducer,
  themeReducer,
  expenseReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();
const {dispatch} = store;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {dispatch, useAppSelector, useAppDispatch};
