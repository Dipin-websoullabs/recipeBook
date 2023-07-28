const app = require('./app')
const dotenv = require('dotenv')
const { connect } = require('http2')
const path = require('path')
const connectDatabase = require('./config/database')//mongodb connection


dotenv.config({path:path.join(__dirname,"config/config.env")})//dotenv configuration using config.env file
const server =  app.listen(process.env.PORT,()=>{//since dotenv configured using config.env file. data or variable in that file comes in (process.env)
    console.log(`Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

connectDatabase();//mongodb connection. it should be write after dotenv.config, else error

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})

