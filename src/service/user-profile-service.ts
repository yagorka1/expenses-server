import { UserSchema } from '../models/db/user-schema';
import { UserModel } from '../models/user/user-model';

class UserProfileService {
  async getAllUsers() {
    const users = await UserSchema.find();
    return users;
  }

  async getUserDataById(email: string): Promise<UserModel> {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return new UserModel({
      ...user.toObject(),
      _id: user._id.toString(),
    });
  }
}

export const userProfileService = new UserProfileService();
