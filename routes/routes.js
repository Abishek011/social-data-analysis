const express = require('express')
const app = express()

const expressws = require('express-ws')(app)

var firebase = require('firebase')

var bcrypt = require('bcrypt')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var saltRounds = 13;

var jwt = require('jsonwebtoken')

var signUp = async (req, res,next) => {
    var email = req.body.email;
    var userName = req.body.userName;
    var password = req.body.password;
    console.log("signUp");
    bcrypt.hash(password, saltRounds, async (err, hash)=> {
        firebase.database().ref('users').push().set({
            email: email,
            userName: userName,
            password: hash
        });
        res.status(201)
        var authorization = jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1d' });/* 
        await res.set('Access-Control-Allow-Origin', '*');
        await res.set('Access-Control-Allow-Credentials', 'true'); */
        await res.set('Authorization', authorization);
        res.send({ message: "Sign Up Successful" });
    });
}
module.exports = {
    signUp
}