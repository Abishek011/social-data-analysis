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

var signUp = async (req, res, next) => {
    console.log("::::",req.body.email);
    var email = req.body.email;
    var flag = true;
    var check = new Promise(async (resolve, reject) => {
        await firebase.database().ref("users").once('value').then((snapshot) => {
            var keys = snapshot.val();
            if(keys){
            Object.keys(keys).forEach(k => {
                console.log(keys[k].email);
                if (keys[k].email.includes(email)) {
                    flag = false;
                    reject("User Already Exist");
                }
            })}
            else{
                reject("No Id Found");
            }
        })
        resolve();
    });
    await check.then(data => {
        next();
    }).catch(err => {
        res.status(409);
        console.log("res");
        res.send({ message: err });
        res.end();
    });
}

module.exports = {
    signUp
}

