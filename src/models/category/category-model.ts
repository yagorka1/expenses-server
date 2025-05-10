import { CategoryInterface } from '../../interfaces/categories/cutegory-interface';
import { CategorySchemaInterface } from '../../interfaces/categories/category-schema-interface';

export class CategoryModel implements CategoryInterface {
  public id: string;
  public name: string;
  public description: string;

  constructor(data: CategorySchemaInterface) {
    this.id = data._id;
    this.name = data.name;
    this.description = data.description;
  }
}
