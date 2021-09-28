import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

// Define rutas de productos
router .get( '/', productController .getProducts );
router .post( '/', productController .createProduct );
router .get( '/:productId', productController .getProductById );
router .put( '/:productId', productController .updateProductById );
router .delete( '/:productId', productController .deleteProductById );

export default router;