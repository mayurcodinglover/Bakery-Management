import jwt from 'jsonwebtoken';

const authMiddleware=(req,res,next)=>{
    
    const {token}=req.headers;
    if(!token)
    {
        return res.json({success:"false",message:"Not Authorized Sign in again"});
    }
    try {
        const token_decode=jwt.verify(token,process.env.SECRET_KEY);
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:"false",message:"Some error"})
    }
}

export default authMiddleware;