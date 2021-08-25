const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    password:'olehdno200799',
    user:'root',
    database:'usermanager'
}).promise();

function getUsers(){
    return connection.execute(`select * from users`)
    .then(([rows,fields])=>rows)
    .catch((err)=>err);
}

function getUserById(id){
    return connection.execute(`select * from users where id=${id}`)
            .then(([rows,fields])=>rows)
            .catch((err)=>err);
}

function addUser(name,email,password,created_at,updated_at){
    return connection.execute(`insert into users (name,email,password,created_at,updated_at) values ('${name}','${email}','${password}','${created_at}','${updated_at}')`)
    .then((res)=>res)
    .catch((err)=>err);
}

function editUser(data,id){
    const {name,email,password,updated_at}=data;
    return connection.execute(`update users set name='${name}',email='${email}',password='${password}',updated_at='${updated_at}' where id=${id}`)
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
    getUserById,
    addUser,
    editUser,
    deleteUser
}