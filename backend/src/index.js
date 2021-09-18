const express = require("express");
const cors=require('cors')
const passport = require('passport');

require("./app/controllers/auth-controller")

const authRouter = require("./app/routes/auth-router");
const userRouter = require("./app/routes/user-router");
const { dbInit } = require("./app/services/db-service");
const { getUsersCount } = require("./app/controllers/users-controller");



const corsOptions = { origin:'*', credentials:true}
const app = express();
app.use(express.json());
app.use(cors(corsOptions))
app.use('/api/v1/users',passport.authenticate('jwt', {session: false}), userRouter)
app.use('/auth/v1',authRouter)
app.get('/api/v1/count',getUsersCount )


app.listen(3000,()=>{
    dbInit() 
    console.log(`Listen on port 3000`);
})