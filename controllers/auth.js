import {response} from 'express';
import bcrypt from "bcryptjs";
import { userModel } from '../models/User.js';
import { generateJWT } from '../helpers/jwt.js';


export const crearUsuario  = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const checkUser = await userModel.findOne({email});

        if(checkUser) {
            return res.status(400).json({
                ok: false,
                message: 'El email ya esta registrado'
            })
        }

        const user = userModel(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al crear el usuario',
        })
    }
    
}

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            })
        }

        const checkPass = bcrypt.compareSync(password, user.password);
        if(!checkPass) {
            return res.status(400).json({
                ok: false,
                message: 'Password incorrecto'
            })
        } 
        
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            message: 'Login',
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al hacer login',
        })
    }
    
}

export const revalidarToken = async (req, res) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}