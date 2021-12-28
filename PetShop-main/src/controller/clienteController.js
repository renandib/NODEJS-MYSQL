import express from 'express';
import db from '../service/clienteService.js';
import {body, validationResult} from "express-validator";
import { cpf } from "cpf-cnpj-validator";


const router = express.Router();

router.post('/',[//validações
    body('name').isLength({min: 1}).withMessage("Nome Vazio"),
    body('name').isLength({max: 45}).withMessage("Digite um nome menor"),
    body('cpf').custom((numCpf) => {
        const checkCPF = cpf.isValid(numCpf);
        if(!checkCPF) return Promise.reject("CPF Inválido");
        return true;
    }),
    body('gender').isLength({min: 1}).withMessage("Digite um genero válido"),
    body('gender').isLength({max: 1}).withMessage("Digite a letra do seu genero"),
    body('phone').isNumeric().withMessage('Telefone deve conter apenas números'),
    body('email').isEmail().withMessage('Digite um Email válido'),
    body('email').isLength({min: 1}).withMessage('Email não pode ser vazio'),
    body('birthday.day').isLength({max: 2}).withMessage('Dia não pode ser inválido'),
    body('birthday.mounth').isLength({max: 2}).withMessage('Mês não pode ser inválido'),
    body('birthday.year').isLength({max: 4}).withMessage('Ano não pode ser inválido'),
    body('birthday.day').isNumeric().withMessage('Dia só pode conter números'),
    body('birthday.mounth').isLength({max: 2}).withMessage('Mês só pode conter números'),
    body('birthday.year').isLength({max: 4}).withMessage('Ano só pode conter números'),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    const {year, mounth, day}= req.body.birthday;
    console.log(year, mounth, day);

    const birth = `${year}/${mounth}/${day}`; 

    try {
        await db.InsertCliente(req.body, birth);
        res.status(201).send({message: 'Cliente cadastrado com sucesso'});
    }catch (err){
        res.status(500).send({message: 'Houve algum erro na inserção'});
    }
});

router.put('/:id', [//validações
    body('name').isLength({min: 1}).withMessage("Nome Vazio"),
    body('name').isLength({max: 45}).withMessage("Digite um noe"),
    body('cpf').custom((numCpf) => {
        const checkCPF = cpf.isValid(numCpf);
        if(!checkCPF) return Promise.reject("CPF Inválido");
        return true;
    }),
    body('gender').isLength({min: 1}).withMessage("Digite um genero válido"),
    body('gender').isLength({max: 1}).withMessage("Digite a letra do seu genero"),
    body('phone').isNumeric().withMessage('Telefone deve conter apenas números'),
    body('phone').isLength({min: 1}).withMessage("Digite um número válido"),
    body('email').isEmail().withMessage('Digite um Email válido'),
    body('email').isLength({min: 1}).withMessage('Email não pode ser vazio'),
    body('birthday.day').isLength({min: 1}).withMessage('Dia não pode ser válido'),
    body('birthday.mounth').isLength({min: 1}).withMessage('Mês não pode ser válido'),
    body('birthday.year').isLength({min: 1}).withMessage('Ano não pode ser válido'),
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id = req.params.id;

    const {year, mounth, day}= req.body.birthday;
    console.log(year, mounth, day);

    const birth = `${year}/${mounth}/${day}`; 

    try{
        await db.updateCliente(req.body, id, birth);
        res.status(201).send({message: "Cliente atualizado com sucesso"});
    }catch{
        res.status(400).send({message: 'Algo deu errado na atualização'})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await db.deleteCliente(id);
        res.status(201).send({message: 'Cliente desativado com sucesso'});
    }catch{
        res.status(400).send({message: 'Erro ao Desativar!'});
    }
});

router.get('/findClient/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const find = await db.findCliente(id);
        res.status(200).send({message: find});
    }catch{
        res.status(400).send({message: "Erro ao buscar"});
    }
});

router.get('/findAll', async (req, res) => {
    try{
        const found = await db. findAlddCliente();
        res.status(200).send({message: found});
    }catch{
        res.status(400).send({message: 'Erro ao buscar todos'});
    }
})


export default router;