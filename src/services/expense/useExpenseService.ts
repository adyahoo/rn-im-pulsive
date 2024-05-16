import {useBottomSheet} from '../../../tmd/providers/BottomSheetProvider';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {ExpenseModel} from '../../models/expense/Expense';
import subheading from '../../../tmd/components/Typography/Subheading';
import {sum} from 'lodash';

export default function useExpenseService() {
  const {showErrorBS} = useBottomSheet();

  const user = useSelector(state => state.authReducer.user);

  const save = async (data: ExpenseModel) => {
    try {
      return await firestore()
        .collection('expense')
        .doc(user.id)
        .collection('expenses')
        .doc(data.id)
        .set(data);
    } catch (e) {
      showErrorBS(e);
    }
  };

  const get = async () => {
    try {
      const res = await firestore()
        .collection('expense')
        .doc(user.id)
        .collection('expenses')
        .get();

      return res.docs;
    } catch (e) {
      console.log('error get expense: ', e);
      showErrorBS(e);
    }
  };

  return {
    save,
    get,
  };
}
