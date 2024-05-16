import useProfileService from '../services/profile/useProfileService';
import {User} from '../models/auth/Auth';
import {useDispatch} from 'react-redux';
import {useState} from 'react';

export default function useProfile() {
  const {updateProfile} = useProfileService();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const update = async (user: User) => {
    setIsLoading(true);

    await updateProfile(user);

    dispatch({
      type: 'UPDATE',
      payload: {
        user: user,
      },
    });

    setIsLoading(false);
  };

  return {
    isLoading,
    update,
  };
}
