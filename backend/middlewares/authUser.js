
// import jwt from 'jsonwebtoken'

// //admin authentication middleware
// const authUser = async(req, res, next)=>{
//     try{
//         const {token} = req.headers
//         if(!token){
//             console.log("no token"),
//             res.json({
//                 success:false,
//                 message:'not authorized login again'
//            })
//         }
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id

//         next()
        
//     }catch(error){
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// export default authUser

import jwt from 'jsonwebtoken'

//user authentication middleware
const authUser = async(req, res, next)=>{
    try{
        const {token} = req.headers
        if(!token){
            console.log("no token"),
            res.json({
                success:false,
                message:'not authorized login again'
           })
           return; // Add return to prevent further execution
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id // Attach userId to req

        next()
        
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export default authUser