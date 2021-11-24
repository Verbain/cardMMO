const axios = require('axios')
class navigationController{
    homepage(req,res){
        const pseudo = req.session.pseudo
        res.render('home',{pseudo})
    }
    login(req,res){
        res.render('login')
    }
    profile(req,res){
        const pseudo = req.session.cookie.pseudo
        const id = req.session.cookie.player_id
        const email = req.session.cookie.email
        console.log(req.session)
        res.render('profile',{pseudo,id,email})
    }
    logout(req,res){
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = new navigationController();