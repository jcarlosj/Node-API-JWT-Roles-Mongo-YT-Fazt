import express from 'express';
import morgan from 'morgan';

import pkg from '../package.json';
import { createDefaultRoles } from './libs/setup'

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';

const
    app = express();

createDefaultRoles();

// Establecemos valores por defecto para Express
app .set( 'pkg', pkg );

const infoApp = {
    name: app .get( 'pkg' ) .name,
    author: app .get( 'pkg' ) .author,
    description: app .get( 'pkg' ) .description,
    version: app .get( 'pkg' ) .version
}

app .use( morgan( 'dev' ) );
app .use( express .json() );

// Routes
app .get( '/', ( request, response ) => {
    response .json( infoApp );
    console .log( infoApp );
});

app .use( '/api/auth', authRoutes );
app .use( '/api/users', userRoutes );
app .use( '/api/products', productRoutes );

export default app;