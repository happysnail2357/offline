const express = require('express')
const app = express()

// Serve static files (HTML, CSS, JS) in folder 'public'
app.use(express.static('public'))

app.get('/', (req, res) => {
    
    res.sendFile('public/sorry.html', {root: __dirname})
})

// Start the server
app.listen(80, () => {
    
    console.log('Server is listening on port 80')
})
