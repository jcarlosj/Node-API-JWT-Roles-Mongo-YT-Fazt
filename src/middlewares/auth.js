import jwt from 'jsonwebtoken';

import User from '../models/User';

import config from '../config/app';

// Midleware Express:
export const verifyToken = async ( request, response, next ) => {

    try {
        const token = request .headers[ 'x-access-token' ];
        console.log( 'token: ', token );

        // ? Verifica si la peticion de acceso NO ENVIA un token
        if( ! token ) return response .status( 403 ) .json({
            error: {
                message: 'The token has not been provided!'
            }
        });

        // ? Decodifica el token (extrae data del token)
        const decoded = jwt .verify( token, config.SECRET );
        console.log( 'decoded token: ', decoded );

        // ? Consulta si el usuario existe en la BD
        const user = await User .findById( decoded .id, { password: 0 } );
        console.log( 'user: ', user );

        // ? Verifica si el usuario NO EXISTE
        if( ! user ) return response .status( 404 ) .json({
            error: {
                message: 'User not found!'
            }
        });

        next();     // Permite acceso a la siguiente funcionalidad de la ruta, en este caso el controlador
    } catch (error) {
        return response .status( 401 ) .json({
            error: {
                message: 'Unauthorized!'
            }
        });
    }

}