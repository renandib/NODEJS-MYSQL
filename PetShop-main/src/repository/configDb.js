import mysql from "mysql2/promise";

async function connect () {
    const dataInfo = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'petShop'
    };

     const connection = await mysql.createConnection(dataInfo);

     return connection;
}

export default {connect};