import database from '../repository/configDb.js';

async function insertFuncionario({name, cpf}){
    const conn = await database.connect();
    const sql = "call sp_insere_funcionario (?, ?)";
    const newFunci = [name, cpf];
    conn.query(sql, newFunci);
    conn.end();
};

async function updateFuncionario({name, cpf}, id){
    const conn = await database.connect();
    const sql = 'CALL sp_update_funcionario(?,?,?);'
    const updtFunci = [
        name,
        cpf,
        id
    ];
    conn.query(sql, updtFunci);
    conn.end();
};

async function disableFuncionario(id){
    const conn = await database.connect();
    const sql = `CALL sp_delete_funcionario(${id})`;
    conn.query(sql);
    conn.end();
};

async function findFuncionario(id){
    const conn = await database.connect();
    const sql = `CALL sp_acha_funcionario(${id})`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows[0];
};

async function findAllFuncionario(){
    const conn = await database.connect();
    const sql = 'SELECT * FROM vw_todos_funcionarios';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
};

export default {insertFuncionario, updateFuncionario, disableFuncionario, findFuncionario, findAllFuncionario};