import mongoose from 'mongoose'
import config from 'config'

const connect= async()=>{
    const dbURi = config.get<string>("dbURi") 
    try {
        await mongoose.connect(dbURi)
        console.log('db connected')
    } catch (error) {
        console.error('could not connect to db')
        process.exit(1)
    }
}  

export default connect