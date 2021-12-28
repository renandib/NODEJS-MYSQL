import database from '../repository/configDb.js';

async function insertServico({description, price, time}){
   const conn = await database.connect();
   const sql = 'CALL sp_insere_servico(?, ?, ?)';
   const newService = [
       description,
       price,
       time
   ]
   conn.query(sql, newService);
   conn.end();
};

async function updateServico({description, price, time}, id){
    const conn = await database.connect();
    const sql = 'CALL sp_update_servico (?, ?, ?, ?)';
    const updservico = [
        id,
        description,
        price,
        time
    ]
    conn.query(sql, updservico);
    conn.end();
};

async function disableServico(id){
    const conn = await database.connect();
    const sql = `CALL sp_delete_servico (${id})`;
    conn.query(sql);
    conn.end();
}

async function findServico(id){
    const conn = await database.connect();
    const sql = `CALL sp_acha_servico(${id})`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
};

async function findAllService(){
    const conn = await database.connect();
    const sql = 'SELECT * from vw_todos_servicos';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {insertServico, updateServico, disableServico, findServico, findAllService}