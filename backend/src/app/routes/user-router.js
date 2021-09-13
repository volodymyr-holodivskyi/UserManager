const express =require("express");
const { getUsers, getUserById, addUser, editUser, deleteUser, getUsersCount } = require("../controllers/users-controller");
const roleMiddleware = require("../middlewares/role-middleware");

const userRouter=express.Router();

userRouter.get("/:id",roleMiddleware(['admin','customer']),getUserById);
userRouter.get('/',roleMiddleware(['admin','customer']), getUsers);
userRouter.post('/',roleMiddleware(['admin']),addUser);
userRouter.put('/',roleMiddleware(['admin']),editUser);
userRouter.delete('/:id',roleMiddleware(['admin']),deleteUser);
module.exports=userRouter;