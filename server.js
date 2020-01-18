const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Routes
app.get('/', (request, response) => response.json({ msg: 'Welcome to the machine.' }))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // set a static folder
  app.use(express.static('/client/build'))
  app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, 'client', 'build', 'index')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on ${PORT}`))
