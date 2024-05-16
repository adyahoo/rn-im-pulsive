interface Category {
  id: number;
  name: string;
  value: string;
  color: string;
}

const _categories: Category[] = [
  {
    id: 1,
    name: 'Tagihan',
    value: 'bill',
    color: '#fbd203',
  },
  {
    id: 2,
    name: 'Makanan',
    value: 'food',
    color: '#ffb300',
  },
  {
    id: 3,
    name: 'Fashion',
    value: 'fashion',
    color: '#ff9100',
  },
  {
    id: 4,
    name: 'House',
    value: 'house',
    color: '#835415',
  },
];

export default _categories;
