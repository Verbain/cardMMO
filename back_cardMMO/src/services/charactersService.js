const charactersDAO = require('../dao/charactersDAO');

class charactersService{
    createCharacters(charactersDto){
        const {idUser, cStr, cDex, cIntel, cVit, cConst} = charactersDto;
        return charactersDAO.createCharacter(idUser, cStr, cDex, cIntel, cVit, cConst);
    }
}

module.exports = new charactersService();