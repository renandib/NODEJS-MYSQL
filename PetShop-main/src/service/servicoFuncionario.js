import database from '../repository/configDb.js';

async function insertServicoFuncionario (servico, funcionario){
    const conn = await database.connect();
    const sql = 'CALL sp_insere_servico_funcionario(?,?)';
    const newData = [
        servico,
        funcionario
    ];
    conn.query(sql, newData);
    conn.end();
};

async function updateServicoFuncionario (id, servico, funcionario){
    const conn = await database.connect();
    const sql = 'CALL sp_update_servico_funcionario(?,?,?)';
    const updData = [
        id,
        servico,
        funcionario
    ];
    conn.query(sql, updData);
    conn.end();
}

async function disableServicoFuncionario (id) {
    const conn = await database.connect();
    const sql = `CALL sp_delete_servico_funcionario(${id})`;
    conn.query(sql);
    conn.end();
}

async function findServicoFuncionario (id){
    const conn = await database.connect();
    const sql = `CALL sp_acha_servico_funcionario(${id})`;
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function findAllServicoFuncionario () {
    const conn = await database.connect();
    const sql = 'select * from tbl_servico_funcionario';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

export default {insertServicoFuncionario, updateServicoFuncionario, 
    disableServicoFuncionario, findServicoFuncionario, findAllServicoFuncionario}