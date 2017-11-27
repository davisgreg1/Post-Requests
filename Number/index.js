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

//When the server receives a get request to /number it will respond with the string the number is: followed by the number. If the number.json file does not exist, the server will respond with the string There is no number.
app.get('/number', (req, res) => {
    fs.readFile('number.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.send(`There is no number`)
            } else {
                return res.send(err)
            }
        }
        console.log(data) //debugging purposes
        res.send(`The number is: ${JSON.parse(data).number}`)
    })
})

//When the server receives a post request to /number, it will look for a number property in the request body, and write the number to the json file. If the number.json file does not exist, the server will create it. The server will respond with the string "number updated".
app.post('/number', (req, res) => {
    if (!req.body.number) {
        return res.send(`Please specify a number`);
    }

    fs.writeFile('number.json', JSON.stringify(req.body), (err) => {
        if (err) {
            return res.send(`error: ${err}`)
        }
        res.send('number updated')
    })

})

const port = 7000;
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})


/**Create an express server that will store a number in the file number.json. 
 * The json file should look like this:          {"number":"4"}


When the server receives a get request to /number it will respond with the string the number is: followed by the number. If the number.json file does not exist, the server will respond with the string There is no number.


When the server receives a post request to /number, it will look for a number property in the request body, and write the number to the json file. If the number.json file does not exist, the server will create it. The server will respond with the string "number updated". */