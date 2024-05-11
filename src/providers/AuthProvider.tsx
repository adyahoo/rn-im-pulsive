/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, {createContext, useContext, useState} from 'react';
import {LoginResponse, User} from '../models/auth/Auth';
import {useBottomSheet} from '../../tmd/providers/BottomSheetProvider';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKey from '../utils/StorageKey';
import useBaseService from '../services/useBaseService';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export type AuthContextType = {
  login: (email: string, password: string) => void;
  register: (email: string, name: string, password: string) => void;
  logout: () => void;
  isLoadingSubmit: boolean;
  isLoadingLogout: boolean;
  isAuthenticated: boolean;
  user?: User;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: any) => {
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated,
  );
  const user = useSelector(state => state.authReducer.user);

  const dispatch = useDispatch();
  const {patchAPI, postAPI} = useBaseService();
  const {showErrorBS} = useBottomSheet();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoadingSubmit(true);
      const res = await auth().signInWithEmailAndPassword(email, password);
      const collection = await firestore().collection('user').get();
      const user = collection.docs.find(
        value => value.data().id == res.user.uid,
      );

      const data: User = user?.data() as User;

      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, res.user.uid);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: data,
        },
      });
      setIsLoadingSubmit(false);
    } catch (e) {
      setIsLoadingSubmit(false);
      showErrorBS(e);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      setIsLoadingSubmit(true);
      const res = await auth().createUserWithEmailAndPassword(email, password);

      const data: User = {
        id: res.user.uid,
        email: email,
        name: name,
        profile: null,
        thumbnail: null,
      };
      await firestore().collection('user').add(data);
      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, res.user.uid);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: data,
        },
      });
      setIsLoadingSubmit(false);
    } catch (e) {
      setIsLoadingSubmit(false);
      showErrorBS(e);
    }
  };

  const logout = async () => {
    try {
      setIsLoadingLogout(true);
      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, '');
      dispatch({
        type: 'LOGOUT',
      });
      setIsLoadingLogout(false);
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      setIsLoadingLogout(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        isLoadingSubmit,
        isLoadingLogout,
        isAuthenticated,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be use inside AuthProvider');
  return context;
};

export default AuthProvider;
