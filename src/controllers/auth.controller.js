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

    response .json({      // status: 204
        method: 'POST',
        path: `/api/auth/signup`,
        msg: 'Sign Up',
        newUser
    });
}