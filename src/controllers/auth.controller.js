import jwt from 'jsonwebtoken';

import app from '../config/app';

// Models
import User from '../models/User';

// Controller Auth
export const signIn = ( request, response ) => {
    response .json( 'singIn' );
}

export const signUp = async ( request, response ) => {
    const { username, email, password, roles } = request .body;

    // TODO: Verificamos si el usuario existe antes de crear el nuevo usuario

    const newUser = new User({
        username,
        email,
        password: await User .encryptPassword( password )
    });

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