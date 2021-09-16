const usersDAO = require('../dao/usersDAO');

class usersService{
    createUser(usersDto){
        const { Pseudo, Email, Password } = usersDto;
        return usersDAO.createUser(Pseudo,Email,Password);
    }
    updatePseudo(usersDto){
        const {id,Pseudo} = usersDto;
        return usersDAO.updateLastname(id,Pseudo);
    }
    updateEmail(usersDto){
        const {id,Email} = usersDto;
        return usersDAO.updateRole(id,Email);
    }
    loginWithEmail(userDto){
        const {Email,Password} = userDto;
        return usersDAO.loginWithEmail(Email,Password);
    }
    loginWithPseudo(userDto){
        const {Pseudo,Password} = userDto;
        return usersDAO.loginWithPseudo(Pseudo,Password);
    }
}

module.exports = new usersService();