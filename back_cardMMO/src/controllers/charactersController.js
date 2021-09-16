const session = require('express-session');
const db = require('../../db/db');
const charactersService = require('../services/charactersService');

class charactersController{
    async createCharacter(req, res){
        try {
            const id = await charactersService.createCharacters(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"new characters created",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async getCharacterPlayer(req,res, playerID){
        playerID = req.params.playerId
        try {
            await db.select().table('characters').where({id_user: playerID}).first().then(function (ret){
                res.status(201).json(ret);
            });
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = new charactersController();