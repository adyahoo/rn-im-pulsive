import useExpenseService from '../services/expense/useExpenseService';
import {useState} from 'react';
import {
  ExpenseGraphicModel,
  ExpenseModel,
  ExpenseType,
} from '../models/expense/Expense';
import moment from 'moment';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {sum} from 'lodash';
import _categories from '../../tmd/data/_categories';

export default function useExpense() {
  const {save, get} = useExpenseService();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const create = async (data, type: ExpenseType) => {
    setIsLoading(true);

    const payload: ExpenseModel = {
      id: uuid.v4().toString(),
      amount: parseInt(data.amount),
      date: moment(data.date).toISOString(),
      note: data.note,
      category: data.category,
      type: type,
    };
    await save(payload);

    setIsLoading(false);
  };

  const fetch = async () => {
    setIsFetching(true);

    const res = await get();

    if (res?.length == 0) {
      return;
    }

    const data: ExpenseModel[] = res.map(e => {
      return {
        id: e.data().id,
        amount: e.data().amount,
        type: e.data().type,
        date: e.data().date,
        note: e.data().note,
        category: e.data().category,
      };
    });

    dispatch({
      type: 'DONE_FETCHING',
      payload: data,
    });

    setIsFetching(false);
  };

  const getTotalBalance = async () => {
    const res = await get();
    const expense = sum(
      res.filter(e => e.data().type == 'minus').map(e => e.data().amount),
    );
    const income = sum(
      res.filter(e => e.data().type == 'plus').map(e => e.data().amount),
    );
    const total = income - expense;

    dispatch({
      type: 'BALANCE_CALCULATED',
      payload: total,
    });
  };

  const getGraphicData = async () => {
    const res = await get();
    const graphicData: ExpenseGraphicModel = {
      color: [],
      total: [],
    };

    _categories.forEach(value => {
      let total = 0;

      res.forEach(e => {
        if (e.data().type == 'minus') {
          if (e.data().category == value.id.toString()) {
            total += e.data().amount;
          }
        }
      });

      if (total != 0) {
        graphicData.total.push(total);
        graphicData.color.push(value.color);
      }
    });

    return graphicData;
  };

  return {
    create,
    fetch,
    getTotalBalance,
    getGraphicData,
    isLoading,
    isFetching,
  };
}
