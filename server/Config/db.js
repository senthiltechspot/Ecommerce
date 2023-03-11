const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect(process.env.MONGO_URI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB