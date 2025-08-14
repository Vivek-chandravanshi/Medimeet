
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoutes.js'

//app
const app = express()

const port = process.env.PORT || 4000

connectDB()
connectCloudinary()


//middlewares
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for form data

app.use(cors())
// app.use(cors({
//   origin: [
//     'https://medimeet-frontend-vi.onrender.com',
//     'https://medimeet-admin-vi.onrender.com'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));


//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
//localhost:4000/api/admin


app.get('/', (req, res)=>{
    res.send("api working fine")
})

app.listen(port, console.log("server started at port no.", port));