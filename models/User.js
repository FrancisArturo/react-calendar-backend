import {Schema, model} from "mongoose";

const userSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

export const userModel = model('users', userSchema);