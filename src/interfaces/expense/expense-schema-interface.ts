export interface ExpenseSchemaInterface {
  _id: string;
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
