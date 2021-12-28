import express from 'express';
import register from './controller/RegisterController.js';
import login from './controller/loginController.js';
import cliente from './controller/clienteController.js';
import animal from './controller/animalController.js';
import funcionario from './controller/funcionarioController.js';
import compra from './controller/compraController.js';
import servico from './controller/servicoController.js';
import animalServico from './controller/animalServicoController.js';
import servicoFuncionario from './controller/servicoFuncionarioController.js';
import { verifyJWT } from './middlewares/jwt.js';

const router = express.Router();

router.use('/cliente', verifyJWT, cliente);//Passo a verificação JWT, se for permitido tem acesso a pagina
router.use('/animal', verifyJWT, animal);
router.use('/funcionario', verifyJWT, funcionario);
router.use('/compra', verifyJWT, compra);
router.use('/login', login);
router.use('/register', register)
router.use('/servico', verifyJWT, servico);
router.use('/animalServico', verifyJWT, animalServico);
router.use('/servicoFuncionario', verifyJWT, servicoFuncionario);

router.use('/*', (req, res) => {//Caso não ache o caminho
    res.status(401).send({message: "Caminho não encontrado"});
});

export default router;