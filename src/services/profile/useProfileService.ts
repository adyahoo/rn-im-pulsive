import firestore from '@react-native-firebase/firestore';
import {User} from '../../models/auth/Auth';
import {useBottomSheet} from '../../../tmd/providers/BottomSheetProvider';

export default function useProfileService() {
  const {showErrorBS} = useBottomSheet();

  const updateProfile = async (user: User) => {
    try {
      return await firestore().collection('user').doc(user.id).update(user);
    } catch (e) {
      showErrorBS(e);
    }
  };

  return {
    updateProfile,
  };
}
