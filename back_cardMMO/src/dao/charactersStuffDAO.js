const db = require("../../db/db");

class charactersStufDAO{
    async createCharacterStuff(){
        const[ret] = await db('characters_stuff').insert();
        return ret;
    }
}

module.exports = new charactersStufDAO()