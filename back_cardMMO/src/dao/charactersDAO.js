const db = require("../../db/db");

class charactersDAO{
    async createCharacter(idUser, cStr, cDex, cIntel, cVit, cConst){
        const [stuffId] = await db('characters_stuff').insert({head : 1}).returning('id');
        const[ret] = await db('characters').insert({
            id_user: idUser,
            id_characters_stuff: stuffId,
            stamina:100,
            lvl:1,
            str:cStr + 5,
            dex:cDex + 5,
            intel:cIntel + 5,
            vit:cVit + 5,
            const:cConst + 5
        }).returning('id');
        return ret;
    }
}

module.exports = new charactersDAO();