const express = require('express')
const expApp = express()
const port = 0
 
expApp.get('/', (req, res) => res.send('Hello World!')) 

var listener = expApp.listen(port, () => {
    process.send('http://localhost:'+ listener.address().port) 
})
 