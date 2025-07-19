import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

const registerUser = async (req, res) => {
    //console.log("registerUser called");
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ 
        success: false,
        message: 'missing details' 
    });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 8 characters long' 
      });
    }
    // Hashing the password
    const salt = await bcrypt.genSalt(10); //why salt is used?
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
        name, email, password: hashedPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
        success:true,
        token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        success:false,
        message: error.message });
  }
}


const loginUser = async (req, res) => {
    //res.send("loginUser called");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'missing details' 
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     return res.status(200).json({ 
      success: true,
      token
    });

  }
    catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

//api to get user profile data
// const getProfile = async (req, res) => {
//     try {
//         const {userId} = req.body; // Assuming you have middleware to set req.user
//         const userData = await userModel.findById(userId).select('-password'); // Exclude password from response
//         return res.status(200).json({ 
//             success: true,
//             userData
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// }

const getProfile = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from req
        const userData = await userModel.findById(userId).select('-password');
        return res.status(200).json({ 
            success: true,
            userData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

//api to update user profile data

// const updateProfile = async (req, res) => {
//     try {
//         const { userId, name, phone, address, dob, gender } = req.body; //  have middleware to set req.user
//         const imageFile = req.file; //  using multer for file uploads
//         if (!name || !phone || !dob || !gender) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Details are missing' 
//             });
//         }
//         // if (!validator.isEmail(email)) {
//         //     return res.status(400).json({ 
//         //         success: false,
//         //         message: 'Invalid email format' 
//         //     });
//         // }

//         await userModel.findByIdAndUpdate(
//           userId,
//           { name, phone, address:JSON.parse(address), dob, gender})

//         if(imageFile){
//           const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//             resource_type: 'image'
//           });
//           const imageUrl = imageUpload.secure_url;
//           await userModel.findByIdAndUpdate(
//             userId,
//             { image: imageUrl }
//           );
//         }

//         return res.status(200).json({ 
//             success: true,
//             message: 'Profile updated successfully'
//         });
    
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// }

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from req
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        if (!name || !phone || !dob || !gender) {
            return res.status(400).json({ 
                success: false,
                message: 'Details are missing' 
            });
        }

        await userModel.findByIdAndUpdate(
          userId,
          { name, phone, address:JSON.parse(address), dob, gender})

        if(imageFile){
          const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
          });
          const imageUrl = imageUpload.secure_url;
          await userModel.findByIdAndUpdate(
            userId,
            { image: imageUrl }
          );
        }

        return res.status(200).json({ 
            success: true,
            message: 'Profile updated successfully'
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// const bookAppointment = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const {docId, slotDate, slotTime} = req.body;
//         const docData = await doctorModel.findById(docId).select('-password'); // Exclude password from response
//         if(!docData.available){
//           return res.status(400).json({ 
//               success: false,
//               message: 'Doctor is not available' 
//           });
//         }

//         let slots_booked = docData.slots_booked;
//         if(slots_booked[slotDate]){
//           if(slots_booked[slotDate].includes(slotTime)){
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Slot already booked' 
//             });
//           }else{
//             slots_booked[slotDate].push(slotTime);
//           }
//         }else{
//           slots_booked[slotDate] = [];
//           slots_booked[slotDate].push(slotTime);
//         }

//         const userData = await userModel.findById(userId).select('-password');

//         delete docData.slots_booked
//         const appointmentData = {
//             userId, 
//             docId,
//             userData,
//             docData,
//             amount: docData.fee,
//             slotDate,
//             slotTime,
//             data: Date.now(),
//         }

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });
//         return res.status(201).json({ 
//             success: true,
//             message: 'Appointment booked successfully',
//         });
//       }
//     catch (error) {
//         console.error(error);
//         return res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
//   }

const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;

        if (!docId || !slotDate || !slotTime) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }
        if (docData.available === false) {
            return res.status(400).json({
                success: false,
                message: 'Doctor is not available'
            });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({
                    success: false,
                    message: 'Slot already booked'
                });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const docDataForAppointment = docData.toObject();
        delete docDataForAppointment.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docDataForAppointment,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const listAppointments = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId })
        res.json({
          success: true,
          appointments
        })

    }catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
  }

  const cancelAppointment = async (req, res) => {
    try{
      const userId = req.userId
      const {appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);

      if(appointmentData.userId !== userId){
        return res.json({
          success: false,
          message: 'You are not authorized to cancel this appointment'
        })
      }
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

      const {docId, slotDate, slotTime} = appointmentData;
      const docData = await doctorModel.findById(docId);
      let slots_booked = docData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      res.json({
        success: true,
        message: 'Appointment cancelled successfully'
      });
    }catch(error){
      console.log(error)
      res.json({
        success:false,
        message: error.message
      })
    }
  }

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment };