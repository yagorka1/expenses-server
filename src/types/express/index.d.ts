import { UserInterface } from '../../interfaces/user/user-interface';

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}
