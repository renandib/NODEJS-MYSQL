import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next){
    const secret = 'Os sonhos dos homens não tem fim';
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'Token não informado'});
    }
    const parts = authHeader.split(' ');
    if(parts.length !== 2){
        return res.status(401).send({message: 'Token Inválido'});
    }
    const [scheme, token] = parts;

    if(scheme !== 'Bearer'){
        return res.status(401).send({message: 'Token Inválido'});
    }

    jwt.verify(token,secret, (err, decoded) => {
        if(err){
            return res.status(401).send({message: 'Usuário ou senha Incorreto'});
        }
        return next();
    })
}

export {verifyJWT};