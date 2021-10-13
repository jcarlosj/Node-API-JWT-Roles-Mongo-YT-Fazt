import { Router } from 'express';
import * as productController from '../controllers/product.controller';

import { auth } from '../middlewares';

const { verifyToken, isAdmin, isModerator } = auth;

const router = Router();

// Define rutas de productos
router .post( '/', [ verifyToken, isModerator ], productController .createProduct );
router .get( '/', productController .getProducts );
router .get( '/:productId', productController .getProductById );
router .put( '/:productId', [ verifyToken, isAdmin ], productController .updateProductById );
router .delete( '/:productId', [ verifyToken, isAdmin ], productController .deleteProductById );

export default router;