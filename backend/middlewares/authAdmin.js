import jwt from 'jsonwebtoken'

//admin authentication middleware
const authAdmin = async(req, res, next)=>{
    try{
        const {atoken} = req.headers
        if(!atoken){
            console.log("no token"),
            res.json({
                success:false,
                message:'not authorized login again'
           })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            console.log("token")
            return res.json({
                success:false,
                message:'not authorized login again'
            })
        }

        next()
        
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export default authAdmin