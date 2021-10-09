import jwt from 'jsonwebtoken';

import app from '../config/app';

// Models
import User from '../models/User';
import Role from '../models/Role';

// Controller Auth
export const signIn = ( request, response ) => {
    response .json( 'singIn' );
}

export const signUp = async ( request, response ) => {
    const { username, email, password, roles } = request .body;

    // TODO: Verificamos si el usuario existe antes de crear el nuevo usuario

    /** Inserta la data usando el Modelo/Schema Mongoose */
    const newUser = new User({
        username,
        email,
        password: await User .encryptPassword( password )
    });

    // ! (1) Verifica si se ha asignado rol al usuario
    if( roles ) {
        const foundRoles = await Role .find({ name: { $in: roles } });

        // * (2) Verifica si encontro roles existentes en el sistema
        if( foundRoles .length <= 0 ) {
            const role = await Role .findOne({ name: 'user' });
            newUser.roles = [ role._id ];
        }
        else {  // * (2) Si no existen, agrega el rol por defecto
            newUser .roles = foundRoles .map( role => role._id );
        }
    }
    else {
        // ! (1) sino asigna rol por defecto */
        const role = await Role .findOne({ name: 'user' });
        newUser.roles = [ role._id ];
    }

    /** Guarda el registro */
    const savedUser = await newUser .save();
    console.log( savedUser );

    /** Crea el Token usando JWT */
    const token = jwt .sign(
        { id: savedUser._id },
        app.SECRET,
        { expiresIn: 86400 /** 24h */ }
    );
    console.log( token );

    response .json({      // status: 204
        method: 'POST',
        path: `/api/auth/signup`,
        msg: 'Sign Up',
        newUser,
        token
    });
}