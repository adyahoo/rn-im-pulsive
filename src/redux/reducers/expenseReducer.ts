import {ExpenseGraphicModel, ExpenseModel} from '../../models/expense/Expense';

export interface ExpenseState {
  data: ExpenseModel[];
  balance: number;
  graphicData: ExpenseGraphicModel;
}

const initialState: ExpenseState = {
  data: [],
  balance: 0,
  graphicData: {
    color: ['#ffffff'],
    total: [100],
  },
};

const authReducer = (state: ExpenseState = initialState, action: any) => {
  switch (action.type) {
    case 'DONE_FETCHING':
      return {
        ...state,
        data: action.payload,
      };
    case 'BALANCE_CALCULATED':
      return {
        ...state,
        balance: action.payload,
      };
    case 'GRAPHIC_CALCULATED':
      return {
        ...state,
        graphicData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
