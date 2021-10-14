import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares';

const router = Router();
const { checkDuplicateUsernameOrEmail } = verifySignUp;

// Define rutas login, logout
router .post( '/signin', authController .signIn );
router .post( '/signup', checkDuplicateUsernameOrEmail, authController .signUp );

export default router;