import { Router } from "express";
import { crearUsuario, loginUsuario, revalidarToken } from "../controllers/auth.js";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { jwtValidator } from "../middlewares/jwtValidator.js";

/* 
    rutas de usuario /auth
    host + /api/auth

*/



const router = Router();

router.post('/new',
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe tener al menos 6 caracteres').isLength({min: 6}),
        fieldValidator
    ], 
    crearUsuario
);

router.post('/', 
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe tener al menos 6 caracteres').isLength({min: 6}),
        fieldValidator
    ],
    loginUsuario
);

router.get('/renew', jwtValidator, revalidarToken);


export default router;