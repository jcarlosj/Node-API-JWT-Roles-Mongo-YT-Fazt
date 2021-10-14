import { format } from 'morgan';
import Role from '../models/Role';

export const checkRolesExisted = async ( request, response, next ) => {

    const
        requestedRoles = request .body .roles,
        existingRoles = await Role .find() .select( '-createdAt -updatedAt' ),
        roles = existingRoles .map( role => role.name );

    console.log( 'requestedRoles: ', requestedRoles );
    // console.log( 'existingRoles: ', existingRoles );
    console.log( 'roles: ', roles );

    // ! Verifica que el rol exista para continuar, en caso contrario lanza un mensaje de error
    for( let i = 0; i < requestedRoles.length; i++ ) {
        if( ! roles.includes( requestedRoles[ i ] ) ) {
            return response .status( 400 ) .json({
                error: {
                    message: `Role ${ requestedRoles[ i ] } does not exists!`
                }
            });
        }
    }

    next();

}