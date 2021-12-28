import express from "express";
import db from '../service/RegisterService.js';
import {body, validationResult} from "express-validator";

const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Informe um email valido'),
    body('password').isLength({min: 8, max:15}).withMessage('Informe uma senha entre 8 e 15 caracteres'),
    body('userName').custom((userName) =>{
        if(userName && userName.split(' ').length > 1){
            return Promise.reject("Nome de usuário não pode conter espaços")
        };
        return true
    })
], async (req, res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    //Para Cadastrar Informe:
    const {email, password, userName} = req.body;
    
    try{
        await db.insertUser(email, password, userName);
        res.status(201).send({message: 'usuario cadastrado com sucesso'})
    }catch(err){
        res.status(500).send({message: `Erro ao Inserir o usuário. ${err}`});
    }
});

router.put('/:id',[
    body('email').isEmail().withMessage('Informe um email valido'),
    body('password').isLength({min: 8, max:15}).withMessage('Informe uma senha entre 8 e 15 caracteres'),
    body('userName').custom((userName) =>{
        if(userName && userName.split(' ').length > 1){
            return Promise.reject("Nome de usuário não pode conter espaços")
        };
        return true
    })
], async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id = req.params.id;
    //Para atualizar
    try{
        await db.updateUser(req.body, id);
        res.status(201).send({mensage:'usuario editado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao editar o usuário. ${err}`});
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    try{
        await db.disableUser(id);
        res.status(201).send({mensage:'usuario desativado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao desativar o usuário. ${err}`});
    }
});

router.get("/getUser/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const found = await db.findUser(id);
        res.status(201).send({message: found[0]});
    }catch{
        res.status(500).send({message: 'Internal error server'})
    }
});

router.get("/getUser", async (req, res) => {
    try{
        const found = await db.findAllUser();
        res.status(201).send({message: found[0]});
    }catch{
        res.status(500).send({message: 'Internal error server'})
    }
})

export default router;