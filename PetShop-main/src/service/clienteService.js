import database from '../repository/configDb.js'

async function InsertCliente({name, cpf, gender, phone, email}, birth){
    const conn = await database.connect();
    const sql = "call sp_insere_cliente (?,?,?,?,?,?)"
    console.log(birth)
    const newCliente = [
        name, 
        cpf, 
        birth, 
        gender, 
        phone, 
        email
    ]
    console.log(newCliente)
    conn.query(sql, newCliente);
    conn.end();
}

async function updateCliente({name, cpf, gender, phone, email}, id, birth){
    const conn = await database.connect();
    const sql = 'call sp_update_cliente (?,?,?,?,?,?,?)';
    const updClient = [
        name, 
        cpf, 
        birth, 
        gender, 
        phone, 
        email, 
        id
    ]
    conn.query(sql, updClient);
    conn.end();
}

async function deleteCliente(id){
    const conn = await database.connect();
    const sql = `call sp_delete_cliente(${id})`;
    conn.query(sql);
    conn.end();
}

async function findCliente(id){
    const conn = await database.connect();
    const sql = `call sp_acha_cliente(${id})`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows
}

async function findAlddCliente(){
    const conn = await database.connect();
    const sql = 'select * from vw_mostra_cliente';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {InsertCliente, updateCliente, deleteCliente, findCliente, findAlddCliente};