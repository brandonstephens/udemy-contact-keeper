const express = require('express')

const app = express()
app.get('/', (request, response) => response.json({ msg: 'Welcome to the machine.' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on ${PORT}`))
