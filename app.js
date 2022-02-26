require('dotenv').config()
require('express-async-errors')


const express = require('express')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const productsRouter = require('./routes/products')


const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>'))

app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
