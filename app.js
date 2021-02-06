const express = require('express')
const app = express()
var firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyBhTfHYQgB2TXBn3yAnKLxY-Y2ZAIFTvNs",
    authDomain: "social-data-analysis-8e63f.firebaseapp.com",
    databaseURL: "https://social-data-analysis-8e63f-default-rtdb.firebaseio.com",
    projectId: "social-data-analysis-8e63f",
    storageBucket: "social-data-analysis-8e63f.appspot.com",
    messagingSenderId: "950353817480",
    appId: "1:950353817480:web:7caca3ddae34af4a50d43d",
    measurementId: "G-79S3FP50BJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()
/* 
firebase.database().ref('users').set({
    username: { 1: "raj", 2: 'ram' },
    email: "email",
    profile_picture: "imageUrl"
}); */

require('dotenv').config()

const port = process.env.PORT || 3000;

app.get('/:key/:count', async (req, res) => {

    let runPy = new Promise(function (resolve, reject) {
        
const { PythonShell } = require('python-shell')
        let pyshell = new PythonShell('main.py');

        // sends a message to the Python script via stdin
        pyshell.send(JSON.stringify(
            [  req.params.key,
               req.params.count,
               process.env.CONSUMER,
               process.env.CONSUMER_SECRET,
               process.env.ACCESS,
               process.env.ACCESS_SECRET
            ]));

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err, code, signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
        });

        /* const pychild = require('child_process');
        const pyprog = pychild.spawn('python3', ['main.py']);
        pyprog.stdout.on('data', function (data) {
            console.log("ds", data);
            resolve(data);
        });

        pyprog.stderr.on('data', (data) => {

            reject(data);
        });
        pyprog.stdin.write(JSON.stringify(
            [
                req.params.key,
                req.params.count,
                process.env.CONSUMER,
                process.env.CONSUMER_SECRET,
                process.env.ACCESS,
                process.env.ACCESS_SECRET
            ]));
        pyprog.stdin.end();
    });

        runPy.then(function (fromRunpy) {
            console.log(fromRunpy.toString());
            res.end(fromRunpy);
        }).catch(err => {
            console.log("error",JSON.stringify(err));
        }); */
    })});

    app.listen(port, () => console.log(`Application listening on port ${port}`)) 
