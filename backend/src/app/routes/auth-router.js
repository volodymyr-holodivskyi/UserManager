const express = require('express');
const authRouter  = express.Router();
const randToken = require('rand-token');

const jwt      = require('jsonwebtoken');
const passport = require('passport');
const { getUserByEmail } = require('../services/users-service');

let refreshTokens={};

/* POST login. */
authRouter.post('/', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            
            const token = jwt.sign({user:user}, 'your_jwt_secret',{expiresIn:60});
            let refreshToken = randToken.uid(256);
            refreshTokens[refreshToken]=user.email;
            return res.json({user:user,token:token,refreshToken:refreshToken});
        });
    })
    (req, res);

});

authRouter.post('/token',function (req,res,next){
    const email = req.body.email;
    const refreshToken = req.body.refreshToken;
    if((refreshToken in refreshTokens)&&refreshTokens[refreshToken]===email){
        
        getUserByEmail(email)
        .then(rows=>{
            const token=jwt.sign({user:rows[0]},'your_jwt_secret',{expiresIn:60});
            console.log(rows[0],token);
            return res.json({email:email,token:token});
        })
        .catch(err=>res.status(401).json({message:'Unauthorized'}))
        
    }else{
        return res.status(401).json({message:'Unauthorized'});
    }
})
module.exports = authRouter;