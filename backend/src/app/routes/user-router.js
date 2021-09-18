const express =require("express");
const { getUsers, getUserById, addUser, editUser, deleteUser, getUsersCount } = require("../controllers/users-controller");
const roleMiddleware = require("../middlewares/role-middleware");

const userRouter=express.Router();

userRouter.get("/:id",roleMiddleware(['admin','customer']),getUserById);
userRouter.get('/',roleMiddleware(['admin','customer']), getUsers);
userRouter.post('/',roleMiddleware(['admin','customer']),addUser);
userRouter.put('/',roleMiddleware(['admin','customer']),editUser);
userRouter.delete('/:id',roleMiddleware(['admin','customer']),deleteUser);
module.exports=userRouter;