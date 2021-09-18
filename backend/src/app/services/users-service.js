const mysql=require('mysql2');
const { connection } = require("./db-service")

function getUsers(){
    return connection.execute(`select * from users`)
            .then(([rows,fields])=>rows)
            .catch((err)=>err);
}

function getUserByEmailAndPassword(email,password){
    return connection.execute(`select * from users where email='${email}' and password='${password}'`)
            .then(([rows,fields])=>rows)
            .catch((err)=>err);
}
function getUserByEmail(email){
    return connection.execute(`select * from users where email='${email}'`)
            .then(([rows,fields])=>rows)
            .catch((err)=>err);
}

function getUserById(id){
    return connection.execute(`select * from users where id=${id}`)
            .then(([rows,fields])=>rows)
            .catch((err)=>err);
}

function addUser(name,email,password,role,created_at,updated_at,entitlements){
    return connection.execute(`insert into users (name,email,password,role,created_at,updated_at,entitlements) values ('${name}','${email}','${password}','${role}','${created_at}','${updated_at}','${entitlements}')`)
    .then((res)=>res)
    .catch((err)=>err);
}

function editUser(data,id){
    const {name,email,password,updated_at,entitlements}=data;
    return connection.execute(`update users set name='${name}',email='${email}',password='${password}',updated_at='${updated_at}',entitlements='${entitlements}' where id=${id}`)
    .then((res)=>res)
    .catch((err)=>err);
}

function deleteUser(id){
    return connection.execute(`delete from users where id=${id}`)
            .then((res)=>res)
            .catch((err)=>err);
}

module.exports={
    getUsers,
    getUserByEmailAndPassword,
    getUserByEmail,
    getUserById,
    addUser,
    editUser,
    deleteUser
}