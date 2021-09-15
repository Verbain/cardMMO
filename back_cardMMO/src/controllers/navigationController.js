class navigationController{
    homepage(req,res){
        const pseudo = req.session.pseudo
        res.render('home',{pseudo})
    }
    login(req,res){
        res.render('login')
    }
    profile(req,res){
        const session = req.session
        const pseudo = session.pseudo
        const id = session.player_id
        const email = session.email
        res.render('profile',{pseudo,id,email})
    }
    logout(req,res){
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = new navigationController();