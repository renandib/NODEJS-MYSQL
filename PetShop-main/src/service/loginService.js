import database from '../repository/configDb.js';

async function login(userEmail, password){
    const conn = await database.connect();
    const sql = "select * from tbl_usuarios where email = ? and senha = ? and estatus = 'A'";
    const dataLogin = [userEmail, password];
    const [rows] = await conn.query(sql, dataLogin)
    conn.end();

    return rows;

}

export default { login}