import { Schema, model } from 'mongoose';

const
    userSchema = new Schema({
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        roles: [{                               // Establece relación de 1 a N
            ref: 'Role',                        // Referencia al Schema Role
            type: Schema .Types .ObjectId       // ID asignado dentro del Schema de Role
        }]
    }, {
        timestamps: true,
        versionKey: false
    });

export default model( 'User', userSchema );