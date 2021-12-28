import express from 'express';
import db from  '../service/loginService.js';
import {generateToken} from '../helpers/useFeatures.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {userEmail, password} = req.body;
    const userFind = await db.login(userEmail, password);
    try{
        if(userFind.length > 0){
            const {id_login, usuario} = userFind[0];
            const token = generateToken(id_login, usuario);
            res.status(200).send({message: 'Login efetuado com sucesso', token})
        }else{
            res.status(401).send({ error: "Usuário ou Senha Incorretos" });
        }
    }catch {
        res.status(500).send({ error: "Internal Server Error" });
    }
})

export default router;