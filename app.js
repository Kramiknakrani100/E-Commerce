require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// database
const connectDB = require('./db/connect')

// other packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// route
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

// middlewere
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.static('./front-end'));
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

// routes
app.get('/api/v1', (req,res)=>{
    res.send("ok")
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
