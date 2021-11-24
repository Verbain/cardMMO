const express = require('express')
const usersController = require('./src/controllers/usersController')
const navigationController = require('./src/controllers/navigationController')
const charactersController = require('./src/controllers/charactersController')
const charactersStuffController = require('./src/controllers/charactersStuffController')
const combatsController = require('./src/controllers/combatsController')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path');
const cors = require('cors');
const db = require('./db/db')
const jwt = require('jsonwebtoken')

const urlEncodedParser = bodyParser.urlencoded({extended : false})

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:['http://localhost:3001'],
    methods:['GET','POST']
}));

app.use(cookieParser());

//set templating engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));
// JWT VERIFY 
const verifyJWT = (req,res,next )=>{
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("token needed")
    } else{
        jwt.verify(token,"jwtSecret",(err,decoded)=>{
            if(err){
                res.json({auth: false,message:"auth failed"});
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}
app.get('/logedIn',verifyJWT,(req,res)=>{
    res.json("logged in !")
})
app.post('/api/logout',verifyJWT,usersController.logout)

app.post("/api/refresh",usersController.refreshToken)
//API navigation views
app.get('/api',navigationController.homepage)
app.get('/api/view/profile',navigationController.profile)
app.get('/api/view/login',navigationController.login)
app.get('/api/view/logout',navigationController.logout)

//users route
//GET
app.get('/users',usersController.getAllUsers)
app.get('/api/user/:ID',verifyJWT,usersController.getOneUsers)
// POST CREATE USERS
app.post('/newUser',usersController.createUser)
// POST UPDATE USERS
app.post('/updateEmailUser',usersController.updateEmail)
app.post('/updatePseudoUser',usersController.updatePseudo)
// POST LOGIN
app.post('/api/login',urlEncodedParser,usersController.login)

// Characters route
// POST CREACTE CHARACTERS
app.post('/api/newCharacters',charactersController.createCharacter)
app.get('/api/character/:playerId',verifyJWT,charactersController.getCharacterPlayer)

//characters stuff route
app.get('/api/bonusStuff/:playerId',charactersStuffController.getBonusFromStuff)

// COMBAT 
app.get('/api/combat/:playerID/:enemyID',combatsController.characters);
app.listen(3000,function(){
    console.log("app listening on port 3000")
})