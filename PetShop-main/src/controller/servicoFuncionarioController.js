import express from 'express';
import db from '../service/servicoFuncionario.js';
import {body, validationResult} from 'express-validator';


const router = express.Router();

router.post('/', [//validações
    body('funcionario').isNumeric().withMessage("Digite a identificação de um funcionario válido"),
    body('servico').isNumeric().withMessage("Digite um serviço válido"),
], async (req, res) => {

    const errors = validationResult(req);//armazeno as validções na váriavel errosr
    if(!errors.isEmpty()){//verifico se a váriavel errors está diferente de vazia,
        return res.status(400).send({errors: errors.array()});// se ela conter algo retorno o erro
    }

    //Faço o destruturing das outra informações para mandar elas para service
    const {funcionario, servico} = req.body;

    try {
        await db.insertServicoFuncionario(funcionario, servico);//Envio as informações para a service
        res.status(200).send({message: 'Agenamento de funcionário feito com sucesso'});//Dou uma resposta para o úsuario
    } catch {//Caso ocorra um erro
        res.status(500).send({message: 'Ocorreu um erro no agendamento de funcioário'})
    }

});

router.put('/:id', [//validações
    body('funcionario').isNumeric().withMessage("Digite a identificação de um funcionario válido"),
    body('servico').isNumeric().withMessage("Digite um serviço válido"),
], async (req, res) => {

    const errors = validationResult(req);//armazeno as validções na váriavel errosr
    if(!errors.isEmpty()){//verifico se a váriavel errors está diferente de vazia,
        return res.status(400).send({errors: errors.array()});// se ela conter algo retorno o erro
    }

    //Faço o destruturing das outra informações para mandar elas para service
    const {funcionario, servico} = req.body;

    //trato o id para atualizar os dados corretamente
    const id = req.params.id;

    try {
        await db.updateServicoFuncionario(id, servico, funcionario);//Envio as informações para a service
        res.status(200).send({message: 'Atualização feita com sucesso'});//Dou uma resposta para o úsuario
    } catch {//Caso ocorra um erro
        res.status(500).send({message: 'Ocorreu um erro na atualização'})
    }
});

router.delete('/:id', async (req, res) => {
    //trato o id para atualizar os dados corretamente
    const id = req.params.id;

    try {
        await db.disableServicoFuncionario(id);//Envio as informações para a service
        res.status(200).send({message: 'Serviço e funcionário cancelado com sucesso'});//Dou uma resposta para o úsuario
    } catch {
        res.status(500).send({message: 'Ocorreu um erro ao desativar serviço de funcionário'});
    }
});

router.get('/find/:id', async (req, res) => {
    //trato o id para atualizar os dados corretamente
    const id = req.params.id;

    try {
        const find = await db.findServicoFuncionario(id);//Envio as informações para a service
        res.status(200).send({message: find[0]});//Dou uma resposta para o úsuario com o que foi achado
    } catch {
        res.status(500).send({message: 'Ocorreu um erro na busca'})
    }
});

router.get('/foundAll', async (req, res) => {
    try {
        const found = await db.findAllServicoFuncionario();//Envio as informações para a service
        res.status(200).send({message: found});//Dou uma resposta para o úsuario com o que foi achado
    } catch {
        res.status(500).send({message: 'Ocorreu um erro na busca de todos os dados'});
    }
})

export default router;