import { UserSchema } from '../models/db/user-schema';
import { UserModel } from '../models/user/user-model';

class UserProfileService {
  async getAllUsers() {
    const users = await UserSchema.find();
    return users;
  }

  async getUserDataById(email: string): Promise<UserModel> {
    const user = await UserSchema.findOne({ email });
    return new UserModel(user);
  }
}

export const userProfileService = new UserProfileService();
