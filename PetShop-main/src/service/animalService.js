import database from '../repository/configDb.js';

async function insertAnimal({animal_name, specie, gender, birth, Weight, client}){
    const conn = await database.connect();
    const sql = "call sp_insere_animal(?, ?, ?, ?, ?, ?)";
    const newAnimal = [
        animal_name, 
        specie, 
        gender, 
        birth, 
        Weight, 
        client
    ]
    conn.query(sql, newAnimal);
    conn.end();
};

async function updateAnimal({animal_name, specie, gender, birth, Weight}, id){
    const conn = await database.connect();
    const sql = 'call sp_update_animal(?, ?, ?, ?, ?, ?)';
    const updAnimal = [
        animal_name, 
        specie, 
        gender, 
        birth, 
        Weight, 
        id
    ];
    conn.query(sql, updAnimal);
    conn.end();
};

async function disableAnimal(id){
    const conn = await database.connect();
    const sql = `call sp_delete_animal(${id})`;
    conn.query(sql);
    conn.end();
};

async function findAnimal(id){
    const conn = await database.connect();
    const sql = `call sp_acha_animal (${id})`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
};

async function findAllAnimal(){
    const conn = await database.connect();
    const sql = 'select * from vw_todos_animais';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}; 

export default {insertAnimal, updateAnimal, disableAnimal, findAnimal, findAllAnimal}