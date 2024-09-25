const express = require('express')
const app = express()
const {router}= require('./Routes/userRoutes')
const cors = require('cors')
const cookie = require('cookie-parser')
// const bodyParser = require('body-parser')
// app.use(bodyParser)
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true // Allow credentials (cookies)
}));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }));

app.use('/',router)




module.exports=app