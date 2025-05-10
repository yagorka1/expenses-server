import { Router } from 'express';
import { userProfileController } from '../controllers/user-profile-controller';

const router = Router();

router.get('/my', userProfileController.getProfile);

export const profileRouter = router;
