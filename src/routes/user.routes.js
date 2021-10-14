import { Router } from 'express';

import { auth, verifySignUp } from '../middlewares';
import { createUser } from '../controllers/user.controller';

const { verifyToken, isSuperAdmin } = auth;
const { checkRolesExisted } = verifySignUp;

const router = Router();

// Define rutas de productos
router .post( '/', [ verifyToken, isSuperAdmin, checkRolesExisted ], createUser );

export default router;