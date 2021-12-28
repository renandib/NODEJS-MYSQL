import express from "express";
import db from '../service/animalService.js';
import {body, validationResult} from "express-validator";


const router = express.Router();

router.post('/', [//validações
    body('animal_name').isLength({min: 1}).withMessage("Nome do Animal está Vazio"),
    body('animal_name').isLength({max: 45}).withMessage("Digite um nome menor"),
    body('specie').isLength({min: 1}).withMessage("Especie não pode ser vazio"),
    body('specie').isLength({max: 45}).withMessage("Digite uma especie menor"),
    body('gender').isLength({min: 1}).withMessage("Digite um genero válido"),
    body('gender').isLength({max: 45}).withMessage("Digite um genero válido "),
    body('Weight').isNumeric().withMessage('Digite o Peso corretamente'),
    body('client').isLength({min: 1}).withMessage('Digite o numero do usuario'),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try {
        await db.insertAnimal(req.body);
        res.status(200).send({message: "Animal inserido com sucesso"});
    }catch {
        res.status(400).send({message: 'Erro ao inserir o animal'});
    }
});

router.put('/:id', [//validações
    body('animal_name').isLength({min: 1}).withMessage("Nome do Animal está Vazio"),
    body('animal_name').isLength({max: 45}).withMessage("Digite um nome menor"),
    body('specie').isLength({min: 1}).withMessage("Especie não pode ser vazio"),
    body('specie').isLength({max: 45}).withMessage("Digite uma especie menor"),
    body('gender').isLength({min: 1}).withMessage("Digite um genero válido"),
    body('gender').isLength({max: 45}).withMessage("Digite um genero válido "),
    body('Weight').isNumeric().withMessage('Digite o Peso corretamente'),
], async (req, res) => {

    const errors = validationResult(req);//armazeno as validções na váriavel errosr
    if(!errors.isEmpty()){//verifico se a váriavel errors está diferente de vazia,
        return res.status(400).send({errors: errors.array()});// se ela conter algo retorno o erro
    }

    const id = req.params.id;

    try{
        await db.updateAnimal(req.body, id);
        res.status(200).send({message: 'Animal atualizado com sucesso'});
    }catch {
        res.status(400).send({message: 'Houvr algum problema na atualização'});
    }
});

router.delete('/:id', async (req, res) => {
    const id =req.params.id;
    try {
        await db.disableAnimal(id);
        res.status(200).send({message: 'Animal excluido com sucesso'});
    }catch {
        res.status(400).send({message: 'Houve algum problema na exclusão'});
    }
});

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const find = await db.findAnimal(id);
        res.status(200).send({message: find});
    }catch {
        res.status(400).send({message: 'Houve algum problema na busca'})
    }
});

router.get('/findAll', async (req, res) => {
    try{
        const found = await db.findAllAnimal();
        res.status(200).send({message: found});
    }catch {
        res.status(400).send({message: 'Erro ao buscar todos'});
    }
});

export default router