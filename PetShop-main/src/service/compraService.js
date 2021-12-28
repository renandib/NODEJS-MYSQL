import database from '../repository/configDb.js';

async function insertCompras(costSale, dateSale, client, funcionario){
    console.log(costSale)
    const conn = await database.connect();
    const sql = 'call sp_insere_compra(?, ?, ?, ?)';
    const newPurchase = [
        costSale, 
        dateSale, 
        client, 
        funcionario
    ];
    console.log(newPurchase)
    conn.query(sql, newPurchase);
    conn.end();
};

async function updateCompras(costSale, dateSale, client, funcionario, id){
    const conn = await database.connect();
    const sql = 'CALL sp_update_compra(?,?,?,?,?)'
    const updPurchase = [
        costSale, 
        dateSale, 
        client, 
        funcionario, 
        id
    ];
    console.log(updPurchase)
    conn.query(sql, updPurchase);
    conn.end();
};

async function disableCompra(id){
    const conn = await database.connect();
    const sql = `CALL sp_delete_compra (${id})`;
    conn.query(sql);
    conn.end();
};

async function findCompra(id){
    const conn = await database.connect();
    const sql = `CALL sp_acha_compra(${id})`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows[0];
}

async function findAllCompras(){
    const conn = await database.connect();
    const sql = 'SELECT * FROM vw_todas_compras';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default { insertCompras, updateCompras, disableCompra, findCompra, findAllCompras};