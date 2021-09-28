import express from 'express';
import morgan from 'morgan';

const
    app = express(),
    infoApp = { author: 'Juan Carlos Jiménez Gutiérrez', description: "Rest API con JWT, Autenticacion (Usuarios/Roles), MongoDB", version: '1.0.0' };

app .use( morgan( 'dev' ) );

// Routes
app .get( '/', ( request, response ) => {
    response .json( infoApp );
    console .log( infoApp );
});

export default app;