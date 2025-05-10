import { UserInterface } from '../../interfaces/user/user-interface';
import { UserSchemaInterface } from '../../interfaces/user/user-schema-interface';

export class UserModel implements UserInterface {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public defaultCurrencyCode: string;
  public role: string;

  constructor(data: UserSchemaInterface) {
    this.id = data._id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.defaultCurrencyCode = data.defaultCurrencyCode;
    this.role = data.role;
  }
}
