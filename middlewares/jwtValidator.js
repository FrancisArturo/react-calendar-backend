import jwt from 'jsonwebtoken';


export const jwtValidator = (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        
        return res.status(401).json({
            ok: false,
            message: 'no hay token en la petición'
        });
    }

    try {
        
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            message: 'Token no válido',
        })
    }

    next();
}