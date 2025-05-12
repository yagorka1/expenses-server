import { UserModel } from '../models/user/user-model';
import { CreateCategoryInterface } from '../interfaces/categories/create-category-interface';
import { categoriesService } from '../service/categories-service';
import { CategoryModel } from '../models/category/category-model';
import { CreateSubcategoryInterface } from '../interfaces/categories/create-subcategory-interface';
import { SubcategoryModel } from '../models/category/subcategory-model';

class CategoriesController {
  async getCategories(req: any, res: any, next: any) {
    try {
      const categories: CategoryModel[] = await categoriesService.getCategoriesList();
      return res.json({ data: categories });
    } catch (e) {
      next(e);
    }
  }

  async getSubcategories(req: any, res: any, next: any) {
    try {
      const subcategories: SubcategoryModel[] = await categoriesService.getSubcategoriesList(req.params.id);
      return res.json({ data: subcategories });
    } catch (e) {
      next(e);
    }
  }

  async getAllSubcategories(req: any, res: any, next: any) {
    try {
      const subcategories: SubcategoryModel[] = await categoriesService.getAllSubcategoriesList();
      return res.json({ data: subcategories });
    } catch (e) {
      next(e);
    }
  }

  async createCategory(req: { body: CreateCategoryInterface, user: UserModel }, res: any, next: any) {
    try {
      const { name, description, icon } = req.body;

      const categoryData: CreateCategoryInterface = {
        name,
        description,
        icon,
      };

      const category: CategoryModel = await categoriesService.createCategory(categoryData);

      return res.json({ data: category });
    } catch (e) {
      next(e);
    }
  }

  async createSubcategory(req: { body: CreateSubcategoryInterface, user: UserModel }, res: any, next: any) {
    try {
      const { name, description, icon, categoryId, isNecessary } = req.body;

      const subcategoryData: CreateSubcategoryInterface = {
        name,
        description,
        icon,
        categoryId,
        isNecessary
      };

      const subcategory: SubcategoryModel = await categoriesService.createSubcategory(subcategoryData);

      return res.json({ data: subcategory });
    } catch (e) {
      next(e);
    }
  }
}

export const categoriesController = new CategoriesController();
