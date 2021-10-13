import { Router } from 'express';
import * as productController from '../controllers/product.controller';

import { verifyToken } from '../middlewares';

const router = Router();

// Define rutas de productos
router .post( '/', verifyToken, productController .createProduct );
router .get( '/:productId', productController .getProductById );
router .put( '/:productId', verifyToken, productController .updateProductById );
router .delete( '/:productId', verifyToken, productController .deleteProductById );

export default router;