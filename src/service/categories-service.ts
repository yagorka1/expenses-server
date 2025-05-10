import { ApiError } from '../exceptions/api-error';
import { CategoryModel } from '../models/category/category-model';
import { CategorySchemaInterface } from '../interfaces/categories/category-schema-interface';
import { CategorySchema } from '../models/db/category-schema';
import { CreateCategoryInterface } from '../interfaces/categories/create-category-interface';
import { CreateSubcategoryInterface } from '../interfaces/categories/create-subcategory-interface';
import { SubcategoryModel } from '../models/category/subcategory-model';
import { SubcategorySchema } from '../models/db/subcategory-schema';
import { SubcategorySchemaInterface } from '../interfaces/categories/subcategory-schema-interface';

class CategoriesService {
  async getCategoriesList(): Promise<CategoryModel[]> {
    try {
      const categories: CategorySchemaInterface[] = await CategorySchema.find();
      return categories.map((category: CategorySchemaInterface) => new CategoryModel(category)) || [];
    } finally {

    }
  }

  async getCategoryById(categoryId: string): Promise<CategoryModel> {
    try {
      const category: CategorySchemaInterface = await CategorySchema.findOne({ _id: categoryId });

      if (!category) {
        throw ApiError.BadRequest('Category not found');
      }
      return new CategoryModel(category);
    } finally {

    }
  }

  async getSubcategoriesList(categoryId: string): Promise<SubcategoryModel[]> {
    try {
      const subcategories: SubcategorySchemaInterface[] = await SubcategorySchema.find({ categoryId });
      return subcategories.map((subcategory: SubcategorySchemaInterface) => new SubcategoryModel(subcategory)) || [];
    } finally {

    }
  }

  async getSubcategoryById(subcategoryId: string): Promise<SubcategoryModel> {
    try {
      const subcategory: SubcategorySchemaInterface = await SubcategorySchema.findOne({ _id: subcategoryId });

      if (!subcategory) {
        throw ApiError.BadRequest('Category not found');
      }
      return new SubcategoryModel(subcategory);
    } finally {

    }
  }

  async createCategory(categoryData: CreateCategoryInterface): Promise<CategoryModel> {
    try {
      const category: CategorySchemaInterface = await CategorySchema.findOne({ name: categoryData.name });

      if (category) {
        throw ApiError.BadRequest('Category has already exist');
      }

      const categorySchema = await CategorySchema.create({ ...categoryData });
      return new CategoryModel(categorySchema);

    } finally {

    }
  }
  async createSubcategory(subcategoryData: CreateSubcategoryInterface): Promise<SubcategoryModel> {
    try {
      const category: CategorySchemaInterface = await CategorySchema.findOne({ _id: subcategoryData.categoryId });

      if (!category) {
        throw ApiError.BadRequest('Category has not exist');
      }

      const subcategory: SubcategorySchemaInterface = await SubcategorySchema.findOne({ name: subcategoryData.name });

      if (subcategory) {
        throw ApiError.BadRequest('Subcategory has not exist');
      }

      const subcategorySchema = await SubcategorySchema.create({ ...subcategoryData });
      return new SubcategoryModel(subcategorySchema);

    } finally {

    }
  }
}

export const categoriesService = new CategoriesService();
