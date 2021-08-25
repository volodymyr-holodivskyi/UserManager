const url =require('url');
const { DeleteSuccess } = require('../models/delete-success');
const { User } = require('../models/user');
const userService=require('../services/users-service');

function getUsers(req,res){
    let urlRequest=url.parse(req.url, true);
    let page = urlRequest.query.page;
    let pageSize = urlRequest.query.pageSize;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    return userService.getUsers()
            .then(users=>res.status(200).json(users))
            .catch(err=>res.status(500).json(err))
}

function getUserById(req,res){
    let urlRequest=url.parse(req.url, true);
    let id = req.params.id;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    return userService.getUserById(id)
            .then(rows=>res.status(200).json(rows[0]))
            .catch(err=>res.status(500).json(res))
}

function addUser(req,res){
   const {name,email,password}=req.body;
   const created_at=dateTransform(new Date().toLocaleString('en-GB'))
   const updated_at=dateTransform(new Date().toLocaleString('en-GB'));
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    return userService.addUser(name,email,password,created_at,updated_at)
            .then(rows=>res.status(200).json("New user created"))
            .catch(err=>res.status(500).json(err))
}  

function editUser(req,res){
    let urlRequest=url.parse(req.url, true);
    let id = urlRequest.query.id;
    let {name,email,password} = req.body;
    let updated_at=dateTransform(new Date().toLocaleString('en-GB'));
    let tmp_name,tmp_email,tmp_password;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
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
                return userService.editUser({
                    name:name,
                    email:email,
                    password:password,
                    updated_at:updated_at
                },id).then(rows=>{
                    console.log(name,email,password);
                    return res.status(200).json(`User №${id} updated`)})
                    .catch(err=>res.status(500).json(err))
                })
                
            
            
    
   
}

function deleteUser(req,res){
    let urlRequest=url.parse(req.url, true);
    let id = urlRequest.query.id;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
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
    deleteUser
}