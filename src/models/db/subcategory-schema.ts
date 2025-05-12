import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  isNecessary: { type: Boolean, required: true },
});

export const SubcategorySchema = mongoose.model('subcategories', subcategorySchema);
