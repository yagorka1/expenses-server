export interface SubcategorySchemaInterface {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  icon?: string;
  isNecessary: boolean;
}
