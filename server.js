const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require ('knex');

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'nirmala007',
		database:'face identifier'
	}
});


const app = express();

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send(database.users)
})

app.post('/signin', (req,res)=> {signin.signinHandler(req,res,db,bcrypt)});

app.post('/register',(req, res)=>{register.registerHandler(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{profile.profileHandler(req,res,db)});

app.put('/image',(req,res)=>{image.imageHandler(req,res,db)});

/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
const DATABASE_URL = process.env.DATABASE_URL
app.listen(3000,()=>{
	console.log(`server is listening on port ${DATABASE_URL}`);
});

console.log (3000)

/*
/ --> res = Hello.....there
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> put = user
*/
