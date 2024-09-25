const express = require('express')
const app = express()
const {router}= require('./Routes/userRoutes')
const cors = require('cors')
const cookie = require('cookie-parser')
// const bodyParser = require('body-parser')
// app.use(bodyParser)
// app.use(cors({
//     origin: 'https://freelanze-frontend-74k8.onrender.com', // Your frontend origin
//     credentials: true // Allow credentials (cookies)
// }));
// app.use(cors());
// app.options('*', cors()); // Enable preflight across all routes

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://freelanze-frontend-74k8.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }));

app.use('/',router)




module.exports=app