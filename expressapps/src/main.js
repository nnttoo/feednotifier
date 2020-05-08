const express = require('express')
const app = express()
const port = 0

app.get('/', (req, res) => res.send('Hello World!'))

var server = app.listen(port, () => console.log(`Example app listening at http://localhost:${server.address().port}`))
console.log("ready")