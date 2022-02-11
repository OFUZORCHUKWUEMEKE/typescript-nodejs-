import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
// import { resourceLimits } from 'worker_threads'
import routes from './route'
import {deserializeUser} from './middleware/deserializeUser'

const app = express()
app.use(express.json())
app.use(deserializeUser)
const port = config.get<number>("port")
   


app.listen(port,()=>{
    console.log(`app running on post ${port}`)
    connect()  
    routes(app)  
}) 

