import database from '../repository/configDb.js';

async function insertAnimalServico(animal, servico, dateServico) {
    const conn = await database.connect();//Crio a conexão com o banco
    const sql = 'CALL sp_insere_animal_servico (?,?,?)';//Faço a chamado do metódo que vou usaar
    const newdata = [
        animal,
        servico,
        dateServico
    ];//Crio um array com as informações a serem mandadas ao banco
    conn.query(sql, newdata);//Envio as informações ao banco
    conn.end();//Fecho a conexão com o banco
};

async function updateAnimalServico(animal, servico, dateServico, id) {
    const conn = await database.connect();//Crio a conexão com o banco
    const sql = 'CALL sp_update_animal_servico (?,?,?,?)';//Faço o chamado do metódo que vou usaar
    const updtData = [
        id,
        animal,
        servico,
        dateServico
    ];//Crio um array com as informações a serem mandadas ao banco
    conn.query(sql, updtData);//Envio as informações ao banco
    conn.end();//Fecho a conexão com o banco
};

async function disableAnimalServico(id) {
    const conn = await database.connect();//Crio a conexão com o banco
    const sql = `call sp_delete_animal_servico(${id})`;//Faço o chamado do metódo que vou usaar
    conn.query(sql);//Envio as informações ao banco
    conn.end();//Fecho a conexão com o banco
};

async function findAnimalServico(id) {
    const conn = await database.connect();//Crio a conexão com o banco
    const sql = `call sp_acha_animal_servico (${id})`;//Faço o chamado do metódo que vou usaar
    const [rows] = await conn.query(sql);//Envio as informações ao banco e armazeno num array
    conn.end();//Fecho a conexão com o banco

    return rows;
};

async function findAllAnimalServico() {
    const conn = await database.connect();//Crio a conexão com o banco
    const sql = "select * from vw_animal_servico";//Faço o chamado do metódo que vou usaar
    const [rows] = await conn.query(sql);//Envio as informações ao banco e armazeno num array
    conn.end();//Fecho a conexão com o banco

    return rows;
}



export default {insertAnimalServico, updateAnimalServico, disableAnimalServico, findAnimalServico, findAllAnimalServico};