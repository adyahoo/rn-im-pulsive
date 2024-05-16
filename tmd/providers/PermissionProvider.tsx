/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, {createContext, useContext} from 'react';
import {Permission} from 'react-native-permissions/src/types';
import {checkMultiple, requestMultiple} from 'react-native-permissions';
import _permissionTypes, {
  BLUETOOTH_PERMISSIONS,
  CAMERA_PERMISSIONS,
  CONTACTS_PERMISSIONS,
  LOCATION_PERMISSIONS,
  PermissionOS,
  STORAGE_PERMISSIONS,
} from '../data/_permissionTypes';
import {PermissionType, useBottomSheet} from './BottomSheetProvider';
import {Platform} from 'react-native';
import {useModal} from './ModalProvider';

type PermissionContextType = {
  requestPermissions: (
    permissions: PermissionOS[],
    onGranted: () => void,
  ) => void;
  requestContactPermission: (onGranted: () => void) => void;
  requestBluetoothPermission: (onGranted: () => void) => void;
  requestStoragePermission: (onGranted: () => void) => void;
};

const initialState: PermissionContextType = {
  requestPermissions: (
    permissions: PermissionOS[],
    onGranted: () => void,
  ) => {},
  requestContactPermission: (onGranted: () => void) => {},
  requestBluetoothPermission: (onGranted: () => void) => {},
  requestStoragePermission: (onGranted: () => void) => {},
};

export const PermissionContext = createContext(initialState);
export const usePermission = () => useContext(PermissionContext);

const PermissionProvider = ({children}: any) => {
  const {showPermissionBS, hidePermissionBS} = useBottomSheet();
  const {showPermissionModal, showConfirmationModal, hideConfirmationModal} =
    useModal();
  const getPermissionType = (
    permission: Permission | undefined,
  ): PermissionType => {
    if (permission) {
      const isAndroid = Platform.OS == 'android';
      let type;
      if (isAndroid) {
        type = _permissionTypes.find(it =>
          it.permissions.android.includes(permission),
        );
      } else {
        type = _permissionTypes.find(it =>
          it.permissions.ios.includes(permission),
        );
      }
      if (type) {
        return type.type;
      } else {
        return 'another';
      }
    } else {
      return 'another';
    }
  };

  const checkPermissions = async (permissions: PermissionOS[]) => {
    const isAndroid = Platform.OS == 'android';
    let osPermissions: Permission[];
    if (isAndroid) {
      osPermissions = permissions.map(it => it.android).flat();
    } else {
      osPermissions = permissions.map(it => it.ios).flat();
    }
    const res = await checkMultiple(osPermissions);
    return Object.keys(res).every(it => res[it] == 'granted');
  };

  const requestPermissions = (
    permissions: PermissionOS[],
    onGranted: () => void,
  ) => {
    const isAndroid = Platform.OS == 'android';
    let osPermissions: Permission[];
    if (isAndroid) {
      osPermissions = permissions.map(it => it.android).flat();
    } else {
      osPermissions = permissions.map(it => it.ios).flat();
    }
    requestMultiple(osPermissions).then(statuses => {
      const results = osPermissions.map(it => statuses[it] == 'granted');
      console.log('sapi permission', statuses, results);
      if (!results.includes(false)) {
        onGranted();
      } else {
        //get first that are not granted
        const notGranted = osPermissions.find(it => statuses[it] != 'granted');
        const type = getPermissionType(notGranted);
        //select which one you want to use
        // showPermissionBS(type);
        showPermissionModal(type);
      }
    });
  };

  const requestContactPermission = async (onGranted: () => void) => {
    const allGranted = await checkPermissions([CONTACTS_PERMISSIONS]);
    if (allGranted) {
      requestPermissions([CONTACTS_PERMISSIONS], onGranted);
    } else {
      showConfirmationModal({
        title: 'Akses Kontak',
        description:
          'Izinkan aplikasi untuk mengakses kontak anda untuk mempermudah anda dalam melakukan input nomor telepon',
        buttonSecondaryTitle: 'Tidak Sekarang',
        buttonPrimaryTitle: 'Izinkan',
        buttonOrientation: 'vertical',
        buttonPrimaryAction: () => {
          hideConfirmationModal();
          requestPermissions([CONTACTS_PERMISSIONS], onGranted);
        },
        buttonSecondaryAction: () => {
          hideConfirmationModal();
        },
      });
    }
  };

  const requestBluetoothPermission = async (onGranted: () => void) => {
    const req: PermissionOS[] = [LOCATION_PERMISSIONS];
    const apiLevel = Platform.Version;
    if (apiLevel >= 31) {
      req.push(BLUETOOTH_PERMISSIONS);
    }
    const allGranted = await checkPermissions(req);
    if (allGranted) {
      requestPermissions(req, onGranted);
    } else {
      showConfirmationModal({
        title: 'Akses Bluetooth',
        description:
          'Izinkan aplikasi untuk mengakses bluetooth anda untuk dapat mencari device terdekat',
        buttonSecondaryTitle: 'Tidak Sekarang',
        buttonPrimaryTitle: 'Izinkan',
        buttonOrientation: 'vertical',
        buttonPrimaryAction: () => {
          hideConfirmationModal();
          requestPermissions(req, onGranted);
        },
        buttonSecondaryAction: () => {
          hideConfirmationModal();
        },
      });
    }
  };

  const requestStoragePermission = async (onGranted: () => void) => {
    const req: PermissionOS[] = [STORAGE_PERMISSIONS(), CAMERA_PERMISSIONS];
    const allGranted = await checkPermissions(req);
    if (allGranted) {
      requestPermissions(req, onGranted);
    } else {
      showConfirmationModal({
        title: 'Akses File',
        description:
          'Izinkan aplikasi untuk mengakses file anda untuk dapat mencari dan melakukan input file',
        buttonSecondaryTitle: 'Tidak Sekarang',
        buttonPrimaryTitle: 'Izinkan',
        buttonOrientation: 'vertical',
        buttonPrimaryAction: () => {
          hideConfirmationModal();
          requestPermissions(req, onGranted);
        },
        buttonSecondaryAction: () => {
          hideConfirmationModal();
        },
      });
    }
  };

  return (
    <PermissionContext.Provider
      value={{
        requestPermissions,
        requestContactPermission,
        requestBluetoothPermission,
        requestStoragePermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
