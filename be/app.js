require('dotenv').config()
const express = require('express')
const app = express()
const connectDb = require('./config/connectDb')
const bookRoutess = require('./routes/bookRoutes')
const cors = require('cors')
const corsOption = require('./config/corsOption' )

//middleware
const asyncHandler = require('express-async-handler')
app.use(express.json())
app.use(cors())


//routes
app.get('/', (req, res) =>
    {
        return res.status(200).send("welcome to Book store")
    })

app.use('/books', bookRoutess)

const start = asyncHandler(async(req, res) =>
    {
        await connectDb(process.env.MONGO_URI)
        console.log("Database is connected");
        app.listen(process.env.PORT, console.log(`Server is connected to port ${process.env.PORT}`))
    })

start()