const mysql=require('mysql2');
const bcrypt=require('bcrypt')
const connection2=mysql.createConnection({
    host:'localhost',
    password:'olehdno200799',
    user:'root'
}).promise();

async function dbInit(){

    await connection2.execute("CREATE DATABASE if not exists usermanager")
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            const connection=mysql.createConnection({
                host:'localhost',
                password:'olehdno200799',
                user:'root',
                database:'usermanager'
            }).promise();
    
    connection.execute(`create table if not exists users(
        id int primary key auto_increment,
        name varchar(255) not null,
        email varchar(255) not null ,
        password varchar(255) not null,
        role enum('admin','customer') not null,
        created_at datetime not null,
        updated_at datetime not null,
        unique(email)
        )`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));

    connection.execute(`select * from users`)
            .then(([rows,fields])=>{
                if(rows.length===0){
                    connection.execute(`insert into users (name,email,password,role,created_at,updated_at) 
                    values ('admin','admin@gmail.com','${bcrypt.hashSync('admin',8)}','admin','2021-09-05','2021-09-05')`)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err));
                }
            })
            .catch(err=>console.log(err));   
    
}

module.exports={
    dbInit,
    connection:mysql.createConnection({
        host:'localhost',
        password:'olehdno200799',
        user:'root',
        database:'usermanager'
    }).promise()
}   