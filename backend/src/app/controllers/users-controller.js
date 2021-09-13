const url =require('url');
const bcrypt = require('bcrypt');
const { DeleteSuccess } = require('../models/delete-success');
const { User } = require('../models/user');
const userService=require('../services/users-service');


function getUsers(req,res){
    let urlRequest=url.parse(req.url, true);
    let page = urlRequest.query.page;
    let pageSize = urlRequest.query.pageSize;
    return userService.getUsers()
            .then(rows=>{

                return res.status(200).json(rows.slice(+page*+pageSize,+pageSize*+page+(+pageSize)))
            })
            .catch(err=>res.status(500).json(err))
}

function getUsersCount(req,res){
    return userService.getUsers()
            .then(rows=>{
                return res.status(200).json(rows.length)
            })
            .catch(err=>res.status(500).json(err))
}

function getUserById(req,res){
    let urlRequest=url.parse(req.url, true);
    let id = req.params.id;
    return userService.getUserById(id)
            .then(rows=>
                res.status(200).json(rows[0]))
            .catch(err=>res.status(500).json(res))
}

async function addUser(req,res){
   const {name,email,password}=req.body;
   if(name===''||email===''||password===''){
       return res.status(500).json('Incorect input data');
       
   }
   let candidate;
   await userService.getUserByEmail(email).then(rows=>{
        candidate=rows[0];
        if(candidate){
            return res.status(400).json({message:'User with this email already exists'});
        }
   })
    .catch(err=>res.status(500).json(res))
   const hashPassword=bcrypt.hashSync(password,8)
   const role='customer';
   const created_at=dateTransform(new Date().toLocaleString('en-GB'));
   const updated_at=dateTransform(new Date().toLocaleString('en-GB'));
    
    return userService.addUser(name,email,hashPassword,role,created_at,updated_at)
            .then(rows=>res.status(200).json("New user created"))
            .catch(err=>res.status(500).json(err))
}  

function editUser(req,res){
    let urlRequest=url.parse(req.url, true);
    let id = urlRequest.query.id;
    let {name,email,password} = req.body;
    let updated_at=dateTransform(new Date().toLocaleString('en-GB'));
    userService.getUserById(id)
            .then(rows=>{
                if(name===undefined||name===''){
                    name=rows[0].name;
                    
                }
                if(email===undefined||email===''){
                    email=rows[0].email;
                    
                }
                if(password===undefined||password===''){
                    password=rows[0].password;
                    
                }
                const hashPassword=bcrypt.hashSync(password,8)
                return userService.editUser({
                    name:name,
                    email:email,
                    password:hashPassword,
                    updated_at:updated_at
                },id).then(rows=>{
                    return res.status(200).json(`User №${id} updated`)})
                    .catch(err=>res.status(500).json(err))
                })
                
            
            
    
   
}

function deleteUser(req,res){
    let urlRequest=url.parse(req.url, true);
    let id = urlRequest.query.id;
    if(id=='1'){
        return res.status(400).json({message:'Can`t delete admin'});
    }
    return userService.deleteUser(id)
            .then(rows=>res.status(200).json(rows[0]))
            .catch(err=>res.status(500).json(err))
}

function dateTransform(date_string){
    let date=date_string.slice(0,date_string.indexOf(','));
    let arr=date.split('/');
    let year=arr[2];
    let month=arr[1];
    let day=arr[0];
    date=year+'-'+month+'-'+day;
    let time=date_string.slice(date_string.indexOf(',')+1);
    return date+' '+time;
}
module.exports={
    getUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser,
    getUsersCount
}