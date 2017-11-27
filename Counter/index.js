const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express() //Create an express server that will store a number in the file number.json.
const fs = require('fs')
const numbersFile = "number.json"

app.use(logger('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//When the server receives a get request to / it will increment the view count by 1 and respond with the string Welcome to my site. If the counter.json file does not exist, the server will create it and set the count to 1.
app.get('/', (req, res) => {
    fs.readFile('counter.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.send(`There is no such file`)
            } else {
                return res.send(err)
            }
        }
        console.log(data) //debugging purposes
        res.send(`Welcome to my site`)
    })
})

app.post('/reset', (req, res) => {
    if (!req.body.counter) {
        return res.send(`Please specify a number`);
    }

    fs.writeFile('counter.json', JSON.stringify(req.body), (err) => {
        if (err) {
            return res.send(`error: ${err}`)
        }
        res.send('counter updated')
    })

})

const port = 7777;
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

/**Create an express server that will count the number of times a site is visited. It will store this number in a json file counter.json. The json file should look like this:

{"count":"4"}
When the server receives a get request to / it will increment the view count by 1 and respond with the string Welcome to my site. If the counter.json file does not exist, the server will create it and set the count to 1.
When the server receives a post request to /reset, it will set the count in the json file to 0. If the counter.json file doesn't exist, the server will create it. */