const express = require('express')
const https = require('https')
const fs = require('fs')


/*************** HTTPS Server ***************/

const app = express()

// Serve static files (HTML, CSS, JS) in folder 'public'
app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile('public/sorry.html', {root: __dirname})
})

const config = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.cert'),
}

// Create the https server with the certificate and key
const server = https.createServer(config, app)

server.listen(443, () => {
    console.log('Https server listening on port 443')
})


/*************** HTTP Redirect Server ***************/

const http = express()

// Redirect http to https
http.get('*', (req, res) => {
    res.redirect(301, 'https://' + req.headers.host + req.url)
})

// Listen on port 80
http.listen(80, () => {
    console.log('Redirect server listening on port 80')
})
