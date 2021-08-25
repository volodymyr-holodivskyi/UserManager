const express = require("express");
const mysql=require('mysql2');
const { getUserById } = require("./app/controllers/users-controller");

const authRouter = require("./app/routes/auth-router");
const userRouter = require("./app/routes/user-router");

const app = express();
app.use(express.json());

//app.use('/api/v1/users/:id',getUserById)
app.use('/api/v1/users',userRouter)
app.use('/auth/v1',authRouter)

const connection=mysql.createConnection({
    host:'localhost',
    password:'olehdno200799',
    user:'root',
    database:'usermanager'
}).promise();

connection.execute("CREATE DATABASE usermanager")
        .then(res=>console.log(res))
        .catch(err=>console.log(err))

connection.execute(`create table if not exists users(
    id int primary key auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    created_at datetime not null,
    updated_at datetime not null
    )`)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

app.listen(3000,()=>{
    console.log(`Listen on port 3000`);
})