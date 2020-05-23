const express = require('express')
require('express-async-errors')

const app = express()
app.use(express.json())
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

app.use('/api/blogs', blogRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())


module.exports = app
