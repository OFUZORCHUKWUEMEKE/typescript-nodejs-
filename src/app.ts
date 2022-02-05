import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
// import routes from './route'
const router = require('./route')

const app = express()
 
const port = config.get<number>('port')



app.listen( ()=>{
    console.log(`app running on post ${port}`)
    connect()  
    
}) 

