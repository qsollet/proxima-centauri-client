var express = require('express')
var app = express()
var port = 3000

app.use(express.static('web'))

app.use('/data', express.static('example\ files'))

app.get('/', function(req, res) {
    res.sendFile('web/index.html')
})

app.listen(port, function() {
    console.log('Server started on port '+port)
})
