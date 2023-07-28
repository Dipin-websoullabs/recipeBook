const express = require('express')
const app =  express()
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv=require('dotenv');

app.use(express.json())
app.use(cookieParser())


const recipe = require('./routes/recipe')
const auth = require('./routes/auth')
dotenv.config({path:path.join(__dirname,"config/config.env")})


app.use('/api/v1/',recipe);
app.use('/api/v1/',auth);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


app.use(errorMiddleware)

module.exports = app