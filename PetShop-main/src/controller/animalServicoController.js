import express from 'express';
import db from '../service/animaServicoService.js';
import {body, validationResult} from 'express-validator';


const router = express.Router();

router.post('/', [//validações
    body('animal').isNumeric().withMessage("Digite a identificação de um animal válida"),
    body('servico').isNumeric().withMessage("Digite um serviço válido"),
    body('dateServico.day').isLength({max: 2}).withMessage('Dia não pode ser inválido'),
    body('dateServico.mounth').isLength({max: 2}).withMessage('Mês não pode ser inválido'),
    body('dateServico.year').isLength({max: 4}).withMessage('Ano não pode ser inválido'),
    body('dateServico.hour').isLength({max: 2}).withMessage('Hora não pode ser inválido'),
    body('dateServico.minutes').isLength({max: 2}).withMessage('Minuto não pode ser inválido'),
    body('dateServico.seconds').isLength({max: 2}).withMessage('Segundos não pode ser inválido'),
    body('dateServico.day').isNumeric().withMessage('Dia só pode conter números'),
    body('dateServico.mounth').isNumeric().withMessage('Mês só pode conter números'),
    body('dateServico.year').isNumeric().withMessage('Ano só pode conter números'),
    body('dateServico.hour').isNumeric().withMessage('Hora só pode conter números'),
    body('dateServico.minutes').isNumeric().withMessage('Minuto só pode conter números'),
    body('dateServico.seconds').isNumeric().withMessage('Segundos só pode conter números'),
], async (req, res) => {

    const errors = validationResult(req);//armazeno as validções na váriavel errosr
    if(!errors.isEmpty()){//verifico se a váriavel errors está diferente de vazia,
        return res.status(400).send({errors: errors.array()});// se ela conter algo retorno o erro
    }

    //Faço o destruturing das outra informações para mandar elas para service
    const {animal, servico} = req.body;

    //Faço um destruturing para poder trabalhar melhor com a data e hora
    const {year, mounth, day, hour, minutes, seconds}= req.body.dateServico;
    
    //Trato a as informações e transformo em uma única váriavel
    const date = `${year}/${mounth}/${day} ${hour}:${minutes}:${seconds}`;
    
    try {
        await db.insertAnimalServico(animal, servico, date);//Envio as informações para a service
        res.status(200).send({message: 'Agenamento feito com sucesso'});//Dou uma resposta para o úsuario
    } catch {//Caso ocorra um erro
        res.status(500).send({message: 'Ocorreu um erro no agendamento'})
    }
})

router.put('/:id', [//validações
    body('animal').isNumeric().withMessage("Digite a identificação de um animal válida"),
    body('servico').isNumeric().withMessage("Digite um serviço válido"),
    body('dateServico.day').isLength({max: 2}).withMessage('Dia não pode ser inválido'),
    body('dateServico.mounth').isLength({max: 2}).withMessage('Mês não pode ser inválido'),
    body('dateServico.year').isLength({max: 4}).withMessage('Ano não pode ser inválido'),
    body('dateServico.hour').isLength({max: 2}).withMessage('Hora não pode ser inválido'),
    body('dateServico.minutes').isLength({max: 2}).withMessage('Minuto não pode ser inválido'),
    body('dateServico.seconds').isLength({max: 2}).withMessage('Segundos não pode ser inválido'),
    body('dateServico.day').isNumeric().withMessage('Dia só pode conter números'),
    body('dateServico.mounth').isNumeric().withMessage('Mês só pode conter números'),
    body('dateServico.year').isNumeric().withMessage('Ano só pode conter números'),
    body('dateServico.hour').isNumeric().withMessage('Hora só pode conter números'),
    body('dateServico.minutes').isNumeric().withMessage('Minuto só pode conter números'),
    body('dateServico.seconds').isNumeric().withMessage('Segundos só pode conter números'),
], async (req, res) => {
    
    const errors = validationResult(req);//armazeno as validções na váriavel errosr
    if(!errors.isEmpty()){//verifico se a váriavel errors está diferente de vazia,
        return res.status(400).send({errors: errors.array()});// se ela conter algo retorno o erro
    }

    //Faço o destruturing das outra informações para mandar elas para service
    const {animal, servico} = req.body;

    //Faço um destruturing para poder trabalhar melhor com a data e hora
    const {year, mounth, day, hour, minutes, seconds}= req.body.dateServico;

    //Trato a as informações e transformo em uma única váriavel
    const date = `${year}/${mounth}/${day} ${hour}:${minutes}:${seconds}`;

    //trato o id para atualizar os dados corretamente
    const id = req.params.id;

    try {
        await db.updateAnimalServico(animal, servico, date, id);//Envio as informações para a service
        res.status(200).send({message: 'Atualização feita com sucesso'});//Dou uma resposta para o úsuario
    } catch {//Caso ocorra um erro
        res.status(500).send({message: 'Ocorreu um erro na atualização'})
    }
});

router.delete('/:id', async (req, res) => {
    //trato o id para atualizar os dados corretamente
    const id = req.params.id;

    try {
        await db.disableAnimalServico(id);//Envio as informações para a service
        res.status(200).send({message: 'Agendamento cancelado com sucesso'});//Dou uma resposta para o úsuario
    } catch {
        res.status(500).send({message: 'Ocorreu um erro ao desativar agendamento'});
    }
});

router.get('/find/:id', async (req, res) => {
    //trato o id para atualizar os dados corretamente
    const id = req.params.id;

    try {
        const find = await db.findAnimalServico(id);//Envio as informações para a service
        res.status(200).send({message: find[0]});//Dou uma resposta para o úsuario com o que foi achado
    } catch {
        res.status(500).send({message: 'Ocorreu um erro na busca'})
    }
})

router.get('/foundAll', async (req, res) => {
    try {
        const found = await db.findAllAnimalServico();//Envio as informações para a service
        res.status(200).send({message: found});//Dou uma resposta para o úsuario com o que foi achado
    } catch {
        res.status(500).send({message: 'Ocorreu um erro na busca de todos os dados'});
    }
})

export default router