const db = require("../../db/db");
const bcrypt = require('bcrypt')

class usersDAO{
    async createUser(Pseudo,Email,Password){
        const salt = 10
        const hash = await bcrypt.hash(Password,salt)
        console.log(hash)
        const[ret] = await db('users').insert({
            pseudo: Pseudo,
            email_adresse: Email,
            password:hash,
        }).returning('id');
        return ret;
    }
    async updatePseudo(id, Pseudo){
        const [ret] = await db('users').where({id: id}).update({pseudo: Pseudo}).returning('id');
        return ret;
    }
    async updateEmail(id, Email){
        const [ret] = await db('users').where({id: id}).update({email_adresse: Email}).returning('id');
        return ret;
    }
    async loginWithEmail(Email,Password){
        const user = await db('users').first().where({email_adresse : Email});
        if (user){
            const correctLog = await bcrypt.compare(Password,user.password)
            if (correctLog){
                return user;
            } else {
                return correctLog;
            }
                
        } else {
            return 404;
            }
        }
        async loginWithPseudo(Pseudo,Password){
            const user = await db('users').first().where({pseudo : Pseudo});
            if (user){
                const correctLog = await bcrypt.compare(Password,user.password)
                if (correctLog){
                    return user;
                } else {
                    return correctLog;
                }
                    
            } else {
                return 404;
                }
        }
}
    


module.exports = new usersDAO();