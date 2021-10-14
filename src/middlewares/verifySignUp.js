import Role from '../models/Role';
import User from '../models/User';

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

export const checkDuplicateUsernameOrEmail = async ( request, response, next ) => {
    let user = await User .findOne({ username: request .body .username });

    // ! Verifica que EXISTA un usuario registrado con el username solicitado
    if( user ) return response .status( 400 ) .json({
        error: {
            message: `There is already a user with this username!`
        }
    });

    user = await User .findOne({ email: request .body .email });

    // ! Verifica que EXISTA un usuario registrado con el email solicitado
    if( user ) return response .status( 400 ) .json({
        error: {
            message: `There is already a user with this email!`
        }
    });
}