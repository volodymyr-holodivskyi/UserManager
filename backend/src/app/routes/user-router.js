const express =require("express");
const { getUsers, getUserById, addUser, editUser, deleteUser } = require("../controllers/users-controller");
const usersController=require("../controllers/users-controller")

const userRouter=express.Router();

userRouter.get("/:id",getUserById);
userRouter.get('/',getUsers);
userRouter.post('/',addUser);
userRouter.put('/',editUser);
userRouter.delete('/:id',deleteUser);
module.exports=userRouter;