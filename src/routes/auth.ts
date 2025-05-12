import { Router } from 'express';

import { authController } from '../controllers/auth-controller';

const router = Router();

router.post('/sign-up', authController.registration);

router.post('/sign-in', authController.login);

router.get('/refresh', authController.refresh);

router.post('/logout', authController.logout);

export const authRouter = router;
