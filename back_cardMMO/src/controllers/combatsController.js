const db = require('../../db/db');
const axios = require('axios')
let playerCharacter = null;
let enemyCharacter = null;
class combatsController{
    async characters(req,res){
        const playerID = req.params.playerID;
        const enemyID = req.params.enemyID;
        const dbPlayerCharacter = await db.select().table('characters').where({id_user: playerID}).first();
        const dbEnemyCharacter = await db.select().table('bestiaire').where({id:enemyID}).first();
        const characterStuff = await axios.get('http://localhost:3000/api/bonusStuff/'+playerID)

        console.log("this is my character : " + JSON.stringify(dbPlayerCharacter, null, 2) );
        console.log("this is my ennemy : " + JSON.stringify(dbEnemyCharacter, null, 2));
        console.log("this is my characterStuff : " + JSON.stringify(characterStuff.data, null, 2));

        playerCharacter = {
            "str": dbPlayerCharacter.str + characterStuff.data.bonus_for,
            "dex": dbPlayerCharacter.dex + characterStuff.data.bonus_dex,
            "intel": dbPlayerCharacter.intel + characterStuff.data.bonus_intel,
            "vit": dbPlayerCharacter.vit + characterStuff.data.bonus_vit,
            "const":dbPlayerCharacter.const + characterStuff.data.bonus_const,
            "hp": dbPlayerCharacter.hp + characterStuff.data.bonus_hp,
            "dmg_min": characterStuff.data.dmg_min,
            "dmg_max": characterStuff.data.dmg_max,
            "weapon_test": characterStuff.data.weapon_test,
            "effect": characterStuff.data.effect
        }
        enemyCharacter = {
            "str":dbEnemyCharacter.str,
            "dex":dbEnemyCharacter.dex,
            "intel":dbEnemyCharacter.intel,
            "vit":dbEnemyCharacter.vit,
            "const":dbEnemyCharacter.const,
            "dmg_min":dbEnemyCharacter.dmg_min,
            "dmg_max":dbEnemyCharacter.dmg_max,
            "hp": dbEnemyCharacter.hp
        }
        console.log('this is my combat playerCharacter : ' + JSON.stringify(playerCharacter, null, 2));
        console.log('this is my combat enemyCharacter : ' + JSON.stringify(enemyCharacter, null, 2));

        this.initiative(playerCharacter.vit,enemyCharacter.vit)
    }
    
    static initiative(characterVit,enemyVit){
        console.log("this is my character initiative test : " + Math.random() * characterVit + 1)
        console.log("this is my enemy initiative test : " + Math.random() * enemyVit + 1)
        return;
    }
}

module.exports = new combatsController();