const CryptoJs=require("crypto-js")

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User=require("../../model/user")
const ErrorHandler = require("../../utils/errorHandler");
const sendToken = require("../../utils/jwtToken");
const { sendResponse } = require("../../utils/sendResponse");
const Auth = require("../../model/auth");

// REGISTER USER
exports.registerUser= catchAsyncErrors(async(req,res,next)=>{

    const {password,confirmPassword,...others}=req.body;

        if(!password || !confirmPassword){
            return next(new ErrorHandler("password fields empty",400))
        }
        
       if(password!==confirmPassword){
        sendResponse(res,400,{success:false,message:"passwords not matching"})
        return next(new ErrorHandler("passwords not matching",401))
       }

        const user=new User({...others})
         const auth= new Auth({
            email:req.body.email,password,user:user._id
         })

         const savedUser=await user.save()

         auth.user=savedUser._id;
         
        
         const savedAuth=await auth.save()
         
          savedUser.auth=savedAuth._id;
         
          if(!savedAuth){
             savedUser.remove()
          }
         await  savedUser.save()
         
         sendResponse(res,200,{success:true,message:"user is registered",
         user:savedUser
        })
})

// LOGIN USER
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{

    const {email,password}=req.body

    //  checking if user has given password and email both

    if(!email || !password){
        sendResponse(res,400,{success:false,message:"please enter email and password"})
        return next(new ErrorHandler("please enter email and password",400))
    }

    const user=await User.findOne({email:email}).populate("auth");
    
    if(!user){
        sendResponse(res,404,{success:false,message:"invalid email or password"})
        return next (new ErrorHandler("invalid email or password",401))
    }

//    compare password statics
     const isPasswordMatched=await Auth.comparePassword(password,user.auth.password)
    if(!isPasswordMatched){
        sendResponse(res,401,{success:false,message:"invalid email or password"})
        return next (new ErrorHandler("invalid email or password",401))
    }
    
    res.user=user
   sendToken(res)

})

// LOGOUT USER
exports.logout=catchAsyncErrors(async(req,res,next)=>{

    sendResponse(res,200,{success:true,message:"user logged out !!!",action:"logout"})
})

