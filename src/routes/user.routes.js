import { Router } from 'express';

import { auth } from '../middlewares';
import { createUser } from '../controllers/user.controller';

const { verifyToken, isSuperAdmin } = auth;

const router = Router();

// Define rutas de productos
router .post( '/', [ verifyToken, isSuperAdmin ], createUser );

export default router;