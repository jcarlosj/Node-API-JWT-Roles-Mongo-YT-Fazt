import { Router } from 'express';

const router = Router();

// Define rutas de productos
router .get( '/products', ( request, response ) => response .json( 'get products' ) );

export default router;