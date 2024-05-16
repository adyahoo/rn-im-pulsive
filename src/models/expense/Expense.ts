export interface ExpenseModel {
  id: string;
  date: string;
  amount: number;
  category: string;
  note: string | null;
  type: ExpenseType;
}

export interface ExpenseGraphicModel {
  total: number[];
  color: string[];
}

export type ExpenseType = 'plus' | 'minus';
