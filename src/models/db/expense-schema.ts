import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  categoryName: { type: String, required: true },
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'subcategories', required: true },
  subcategoryName: { type: String, required: true },
  person: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amounts: { type: Object, required: true },
});

export const ExpenseSchema = mongoose.model('expenses', expenseSchema);
