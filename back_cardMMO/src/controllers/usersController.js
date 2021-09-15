const session = require('express-session');
const db = require('../../db/db');
const usersService = require('../services/usersService');

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
                        res.redirect('/');
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
                        req.session.pseudo = log.pseudo
                        req.session.email = log.email_adresse
                        req.session.player_id = log.id
                        res.redirect('/');
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
        }
    }
}

module.exports = new usersController();