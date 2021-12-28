import express, { response } from 'express';
import db from '../service/servicoService.js';
import {body, validationResult} from "express-validator";


const router = express.Router();

router.post('/', [//validações
    body('description').isLength({min: 1}).withMessage("Descrição não pode ser vazia"),
    body('price').isDecimal().withMessage("Digite um valor válido"),
    body('time').isLength({min: 1}).withMessage("Digite um horário válido"),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    try{
        await db.insertServico(req.body);
        res.status(200).send({message: 'Serviço cadastrado com sucesso'});
    } catch {
        res.status(500).send({message: 'Houve um erro ao inserir o serviço'})
    }
});

router.put('/:id', [//validações
    body('description').isLength({min: 1}).withMessage("Descrição não pode ser vazia"),
    body('price').isDecimal().withMessage("Digite um valor válido"),
    body('time').isLength({min: 1}).withMessage("Digite um hotário válido"),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id = req.params.id;

    try{
        await db.updateServico(req.body, id);
        res.status(200).send({message: 'Atualização nos serviços feita com sucesso'});
    } catch {
        res.status(500).send({message: 'Erro ao atualizar os serviços'});
    }
});

router.delete('/:id', async (req, res) => {
    
    const id = req.params.id;

    try{
        await db.disableServico(id);
        res.status(200).send({message: 'Serviço desaativado com sucesso'})
    } catch {
        res.status(200).send({message: 'Ocorreu um erro na desativação'})
    }
});

router.get('/find/:id', async (req, res) => {

    const id = req.params.id;

    try{
        const find = await db.findServico(id);
        res.status(200).send({message: find});
    } catch {
        res.status(500).send({message: 'Ocorreu um erro na busca do Servico'});
    }
});

router.get('/foundAll', async (req, res) => {
    try{
        const found = await db.findAllService();
        res.status(200).send({message: found});
    } catch {
        res.status(500).send({message: 'Ocorreu um erro ao achar todos'})
    }
})


export default router;