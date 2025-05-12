import { SubcategoryInterface } from '../../interfaces/categories/subcategory-interface';
import { SubcategorySchemaInterface } from '../../interfaces/categories/subcategory-schema-interface';

export class SubcategoryModel implements SubcategoryInterface {
  public id: string;
  public categoryId: string;
  public name: string;
  public description: string;
  public isNecessary: boolean;

  constructor(data: SubcategorySchemaInterface) {
    this.id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.isNecessary = data.isNecessary;
  }
}
