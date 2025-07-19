import jwt from 'jsonwebtoken'

//doctor authentication middleware
const authDoctor = async(req, res, next)=>{
    try{
        const {dtoken} = req.headers
        if(!dtoken){
            console.log("no token"),
            res.json({
                success:false,
                message:'not authorized login again'
           })
           return; // Add return to prevent further execution
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.docId = token_decode.id // Attach userId to req

        next()
        
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export default authDoctor