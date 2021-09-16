const express = require('express')
const usersController = require('./src/controllers/usersController')
const navigationController = require('./src/controllers/navigationController')
const charactersController = require('./src/controllers/charactersController')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const urlEncodedParser = bodyParser.urlencoded({extended : false})

app.use(express.json());
app.use(cors());
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized: false
}))
//set templating engine
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));

//API navigation views
app.get('/', navigationController.homepage)
app.get('/api/view/profile',navigationController.profile)
app.get('/api/view/login',navigationController.login)
app.get('/api/view/logout',navigationController.logout)
//users route
//GET
app.get('/users',usersController.getAllUsers)
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
app.get('/api/character/:playerId',charactersController.getCharacterPlayer)

app.listen(3000,function(){
    console.log("app listening on port 3000")
})