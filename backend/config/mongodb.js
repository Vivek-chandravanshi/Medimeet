
import mongoose from 'mongoose'
const connectDB = async()=>{
    mongoose.connection.on('connected', ()=> console.log('DATABASE CONNECTED'))
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    
    mongoose.connection.once('open', () => {
    console.log('Connected to DB:', mongoose.connection.name);
});

}

export default connectDB