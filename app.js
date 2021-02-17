require('dotenv').config();

const express = require('express')
const app = express()
/* 
const expressws = require('express-ws')(app) */

const cors = require('cors');

app.use(cors());

var firebase = require('firebase')

var bcrypt = require('bcrypt')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var saltRounds = 13;

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

const port = process.env.PORT || 3000;

var route = require('./routes/routes')

var middleWare = require("./routes/middleWare/middleWare")

console.log("Entry");

app.post('/user/signUp',middleWare.signUp, route.signUp);

/* app.get('/key/:count', async (req, res) => {

    let runPy = new Promise(function (resolve, reject) {

        const { PythonShell } = require('python-shell')
        let pyshell = new PythonShell('main.py');

        // sends a message to the Python script via stdin
        pyshell.send(JSON.stringify(
            ["man",
                5,
                process.env.CONSUMER,
                process.env.CONSUMER_SECRET,
                process.env.ACCESS,
                process.env.ACCESS_SECRET
            ]));

        pyshell.on('message', function (message) {
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err, code, signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
        });
    })
}); */

/* 
app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.params);
}); */

app.listen(port, () => console.log(`Application listening on port ${port}`)) 