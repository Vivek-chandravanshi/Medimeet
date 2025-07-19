import validator from 'validator'
import bcrypt from 'bcrypt'
import doctorModel from '../models/doctorModel.js'
import {v2 as cloudinary} from 'cloudinary'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


//api for adding doctor
const addDoctor = async(req, res)=>{
    try{
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file
        //console.log({name, email, password, speciality, degree, experience, about, fees, address}, imageFile)
        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                success:false,
                message:"missing detail/s"
            })
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"invalid email"
            })
        }

        //validating strong password
        if(password.length < 8){
            return res.json({
                success: false,
                message:"password length must be at least 8 characters long"
            })
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //uploading image to cloudinary
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name, email, image:imageUrl, password:hashedPassword,
            speciality, degree, fees, experience, about, address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        //console.log('Saved doctor:', newDoctor);

        const allDoctors = await doctorModel.find();
        //console.log('All doctors in DB:', allDoctors);

        res.json({
            success:true,
            message:"doctor added successfully"
        })

    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

const loginAdmin = async(req, res)=>{
    try{
        const {email, password} = req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({
                success:true, 
                token
            })
        }else{
            res.json({
                success:false,
                message:"invalid credentials"
            })
        }
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

const allDoctors = async(req, res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({
            success:true,
            doctors
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

//api to get all appointments list
const appointmentsAdmin = async(req, res)=>{
    try{
        const appointments = await appointmentModel.find({})
        res.json({
            success:true,
            appointments
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

//cancel appointment by admin
const appointmentCancel = async (req, res) => {
    try{
      const { appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);


      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

      const {docId, slotDate, slotTime} = appointmentData;
      const docData = await doctorModel.findById(docId);
      let slots_booked = docData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      res.json({
        success: true,
        message: 'Appointment cancelled'
      });
    }catch(error){
      console.log(error)
      res.json({
        success:false,
        message: error.message
      })
    }
  }

  //api to get dashboard for admin

const adminDashboard = async(req, res)=>{
    try{
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({
            success:true,
            dashData
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}
export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}