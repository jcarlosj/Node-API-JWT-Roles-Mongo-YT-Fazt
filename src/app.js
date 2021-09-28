import express from 'express';
import morgan from 'morgan';

import pkg from '../package.json';

import productRoutes from './routes/product.routes';

const
    app = express();

// Establecemos valores por defecto para Express
app .set( 'pkg', pkg );

const infoApp = {
    name: app .get( 'pkg' ) .name,
    author: app .get( 'pkg' ) .author,
    description: app .get( 'pkg' ) .description,
    version: app .get( 'pkg' ) .version
}

app .use( morgan( 'dev' ) );

// Routes
app .get( '/', ( request, response ) => {
    response .json( infoApp );
    console .log( infoApp );
});

app .use( '/products', productRoutes );

export default app;