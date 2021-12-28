import express from 'express';
import db from '../service/funcionarioService.js';
import {body, validationResult} from "express-validator";
import { cpf } from "cpf-cnpj-validator";


const router =  express.Router();

router.post('/', [//validações
    body('name').isLength({min: 1}).withMessage("Nome Vazio"),
    body('name').isLength({max: 45}).withMessage("Digite um noe"),
    body('cpf').custom((numCpf) => {
        const checkCPF = cpf.isValid(numCpf);
        if(!checkCPF) return Promise.reject("CPF Inválido");
        return true;
    }),
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    try{
        await db.insertFuncionario(req.body);
        res.status(200).send({message: "Funcionario cadastrado com sucesso"});
    } catch {
        res.status(400).send({message: "Houve algum erro ao inserir"})
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
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id = req.params.id;

    try{
        await db.updateFuncionario(req.body, id);
        res.status(200).send({message: "Funcionario atualizado com sucesso"});
    } catch {
        res.status(400).send({message: "Houve algum problema na atualização"})
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await db.disableFuncionario(id);
        res.status(200).send({message: 'Funcionario Desativado com sucesso'});
    }catch {
        res.status(500).send({message: 'Houve algum erro em desativar'});
    }
});

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const find = await db.findFuncionario(id);
        res.status(200).send({messae: find });
    }catch {
        res.status(500).send({message: 'Houe algum problema na busca'});
    }
});

router.get('/findAll', async (req, res) => {
    try{
        const found = await db.findAllFuncionario();
        res.status(200).send({message: found});
    }catch {
        res.status(500).send({message: 'Erro ao achar todos os funcionarios'})
    }
})

export default router;