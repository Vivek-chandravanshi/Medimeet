
import express from 'express';
import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointments, cancelAppointment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

console.log("userRouter loaded");  // Put this at the top of file

const userRouter = express.Router();

userRouter.post('/register', registerUser);
// userRouter.get('/test', (req, res) => {
//   res.send('User route working');
// });

userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointments)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

export default userRouter;