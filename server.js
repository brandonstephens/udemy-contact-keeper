const express = require('express')

const app = express()

app.get('/', (request, response) => response.json({ msg: 'Welcome to the machine.' }))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on ${PORT}`))
