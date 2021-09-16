const axios = require('axios')
class navigationController{
    homepage(req,res){
        const pseudo = req.session.pseudo
        if (req.session.player_id){
        axios.get(`localhost:3000/api/character/${req.session.player_id}`).then(r=>{
            console.log(r.data)
            const character = r.data
            res.render('home',{pseudo,character})
        }).catch(error => {
            res.return ={
                response:{error: error.message}
            };})     
        } else {
            const character = 0;
            res.render('home',{pseudo,character})
        }
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