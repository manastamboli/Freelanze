const express = require('express')
const app = express()
const {router}= require('./Routes/userRoutes')
const cors = require('cors')
const cookie = require('cookie-parser')
// const bodyParser = require('body-parser')
// app.use(bodyParser)
app.use(cors({
    origin: 'https://freelanze-frontend-74k8.onrender.com', // Your frontend origin
    credentials: true // Allow credentials (cookies)
}));
app.use(cors());
app.options('*', cors()); // Enable preflight across all routes
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }));

app.use('/',router)




module.exports=app