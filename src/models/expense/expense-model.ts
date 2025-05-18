import { ExpenseInterface } from '../../interfaces/expense/expense-interface';
import { ExpenseSchemaInterface } from '../../interfaces/expense/expense-schema-interface';

export class ExpenseModel implements ExpenseInterface {
  public id: string;
  public amount: number;
  public categoryId: string;
  public categoryName: string;
  public currency: string;
  public date: Date;
  public person: string;
  public subcategoryId: string;
  public subcategoryName: string;
  public description: string;
  public amounts: { [key: string]: number };

  constructor(data: ExpenseSchemaInterface) {
    this.id = data._id;
    this.amount = data.amount;
    this.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
    this.currency = data.currency;
    this.date = data.date;
    this.person = data.person;
    this.subcategoryId = data.subcategoryId;
    this.subcategoryName = data.subcategoryName;
    this.description = data.description;
    this.amounts = data.amounts;
  }
}
