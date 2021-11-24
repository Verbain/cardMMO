const session = require('express-session');
const db = require('../../db/db');
const usersService = require('../services/usersService');
const jwt = require('jsonwebtoken')
let refreshTokens = []
class usersController{
    async createUser(req, res){
        try {
            const id = await usersService.createUser(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"new chef created",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updatePseudo(req, res){
        try {
            const id = await usersService.updatePseudo(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"User Pseudo updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateEmail(req, res){
        try {
            const id = await usersService.updateEmail(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"user Email updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async  getAllUsers(req,res){
        try {
            await db.select().table('users').then(function (ret){
                res.status(201).json(ret);
            });
        } catch (err){
            console.log(err);
        }
    }
    async getOneUsers(req,res){
        const id = req.params.ID
        try{
            await db.select().table('users').where({id:id}).first().then(function(ret){
                res.status(201).json({pseudo:ret.pseudo})
            });
        } catch (err){
            console.log(err);
        }
    }
    async login(req,res){
        if(!req.body.Email == '')
        {
            try {
                const log = await usersService.loginWithEmail(req.body);
                if(log != 404)
                {
                    if (log)
                    {
                        req.session.pseudo = log.pseudo
                        req.session.id = log.id
                        req.session.email = log.email_adresse
                        const id = log.id
                        const token = jwt.sign({id},"jwtSecret",{
                            expiresIn:300,
                        })
                        res.status(201).json({
                            auth: true,
                            token: token,
                            data : log
                        });
                    } else {
                        res.status(201).json({
                            status:201,
                            response:"acces denied wrong password",
                            data:req.body
                        });
                    }
                } else {
                    res.status(404).json({
                        status:404,
                        response:'user not found'
                    })
                }
            } catch (err){
                console.log(err);
            }
        } else {
            try {
                const log = await usersService.loginWithPseudo(req.body);
                if(log != 404)
                {
                    if (log)
                    {
                        const id = log.id
                        const pseudo = log.pseudo
                        const accessToken = jwt.sign({id},"jwtSecret",{
                            expiresIn:"15s",
                        })
                        const refreshToken = jwt.sign({id},"RefreshJwtSecret",{
                            expiresIn:"30m"
                        })
                        refreshTokens.push(refreshToken)
                        res.json({
                            auth: true,
                            data : log,
                            accessToken,
                            refreshToken
                        });
                    } else {
                        res.json({
                            auth: false,
                            message:"wrong username / password"
                        });
                    }
                } else {
                    res.json({
                        auth: false,
                        message:"no user exist"
                    });
                }
            } catch (err){
                console.log(err);
            }
        }
    }
    refreshToken (req,res){

        const refreshToken = req.body.token
        console.log('my refresh token: ' + refreshToken)
        console.log('my tab refresh tokens ' + refreshTokens)
        console.log('my 403 : ' + !refreshTokens.includes(refreshToken))
        console.log(refreshTokens)
        if(!refreshToken) return res.status(401).json("not authenticated ")
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json('refresh token is not valid')
        }
        jwt.verify(refreshToken,"RefreshJwtSecret",(err,userId)=>{
            err && console.log(err);

            const id = userId.id
            const pseudo = userId.pseudo
            refreshTokens = refreshTokens.filter((token) => token !==refreshToken);
            const newAccesToken = jwt.sign({id},"jwtSecret",{
                expiresIn:"15s",
            })
            const newRefreshToken = jwt.sign({id},"RefreshJwtSecret",{
                expiresIn:"30m"
            })
            refreshTokens.push(newRefreshToken);

            res.status(200).json({
                accessToken:newAccesToken,
                refreshToken:newRefreshToken
            })
        })
    }
    logout(req,res){
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((token)=>token !== refreshToken)
        res.status(200).json("you logged out succesfully.")
    }
}

module.exports = new usersController();