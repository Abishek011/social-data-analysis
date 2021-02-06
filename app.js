const express = require('express')
const app = express()

app.get('/:key/:count', async (req, res) => {

    let runPy = new Promise(function (resolve, reject) {

        const pychild = require('child_process');
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
            console.log("error");
        });
})

app.listen(4000, () => console.log('Application listening on port 4000!')) 