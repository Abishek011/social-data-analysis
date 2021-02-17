var firebase = require('firebase')

var signUp = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log("::::",req.body);
    var email = req.body.email;
    var check = new Promise(async (resolve, reject) => {
        await firebase.database().ref("users").once('value').then((snapshot) => {
            var keys = snapshot.val();
            if(keys){
            Object.keys(keys).forEach(k => {
                console.log(keys[k].email);
                if (keys[k].email.includes(email)) {
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
    }).catch(async err => {/* 
        await res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/');
        await res.setHeader('Access-Control-Allow-Credentials', 'true'); */
        res.status(409);
        console.log("res");
        res.send({ message: err });
        res.end();
    });
}

module.exports = {
    signUp
}

