import jwt from 'jsonwebtoken';

import app from '../config/app';

// Models
import User from '../models/User';
import Role from '../models/Role';

// Controller Auth
export const signIn = async ( request, response ) => {

    const userFount = await User .findOne({ email: request .body .email }) .populate( 'roles' );

    /** Verifica si el usuario NO EXISTE */
    if( ! userFount ) {
        console .log( 'User not found!' );
        return response .json({
            method: 'POST',
            path: `/api/auth/signin`,
            msg: 'User not found!',
        });
    }

    console .log( userFount );

    /** Consulta que compara si la contrasena enviada es igual a la del usuario encontrado */
    const matchPassword = await User .comparePassword( request .body .password, userFount .password );

    /** Verifica la cohincidencia de las contrasenias */
    if( ! matchPassword ) return response . status( 401 ) .json({
        method: 'POST',
        path: `/api/auth/signin`,
        msg: 'Invalid password!',
    });

    /** Crea el Token usando JWT */
    const token = jwt .sign(
        { id: userFount._id },
        app.SECRET,
        { expiresIn: 86400 /** 24h */ }
    );
    console.log( 'token: ', token );

    response .json({      // status: 204
        method: 'POST',
        path: `/api/auth/signin`,
        msg: 'Authenticated user!',
        userFount,
        token
    });
}

export const signUp = async ( request, response ) => {
    const { username, email, password, roles } = request .body;

    let user = await User .findOne({ email });  // Query using Mongoose

    /** Verifica si el usuario EXISTE */
    if( user ) {
        return response .status( 400 ) .json({
            method: 'POST',
            path: `/api/auth/signup`,
            msg: 'User already exists!',
        });
    }

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
    console.log( 'token: ', token );

    response .json({      // status: 204
        method: 'POST',
        path: `/api/auth/signup`,
        msg: 'Registered user!',
        newUser,
        token
    });
}