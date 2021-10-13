import { Schema, model } from 'mongoose';

const
    roleSchema = new Schema({
        name: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true,
        versionKey: false
    });

export default model( 'Role', roleSchema );