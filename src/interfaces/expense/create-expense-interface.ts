export interface CreateExpenseInterface {
  amount: number;
  currency: string;
  categoryName: string;
  categoryId: string;
  subcategoryName: string;
  subcategoryId: string;
  person: string;
  description: string;
  date: Date;
}
