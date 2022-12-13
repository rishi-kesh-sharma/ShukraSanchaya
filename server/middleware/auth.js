const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const getAuthenticatedUser = require("../utils/getAuthenticatedUser");

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{

    const {token}= req.cookies
    if(!token){
        res.redirect("/login")
        return  next(new ErrorHandler("please login to access this resource",401))

    }
    const authenticatedUser=await getAuthenticatedUser(token)
    if(!authenticatedUser){
        res.redirect("/login")

        return  next(new ErrorHandler("please login to access this resource",401))
     }
     req.user=authenticatedUser
    next()

})

// not authenticated user

exports.isNotAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{

    const {token}=req.cookies

    if(token){

        const authenticatedUser=await getAuthenticatedUser(token)
        if(authenticatedUser){
            req.user=authenticatedUser
            res.redirect("/")
       }
    }

     next()
})



exports.authorizeRoles=(authorizedRoles)=>{


    return(
        (req,res,next)=>{
            
            const isAuthorized= req.user.role.filter((item)=>{
               return authorizedRoles.includes(item)
            })
            
            if(!isAuthorized.length>0){
                next( new ErrorHandler(` not allowed to access this resource`,400) )
             }
             next()
            }
    ) 
}

exports.isDonor=catchAsyncErrors((req,res,next)=>{
if(!req.user.role.includes("donor")){
   next( new ErrorHandler(`you are not a donor`,401))
}
})


exports.isAuthorizedUser=catchAsyncErrors((req,res,next)=>{
    console.log(req.params.userId)
    if(req.params.userId){

        if(req.user._id==req.params.userId){
            next()
        }else{
            next(new ErrorHandler("you are not authorized user",401))
        }
        
    }else{
           next(new ErrorHandler("userId is missing",400))
    }
})

exports.isClientUserOnly=catchAsyncErrors((req,res,next)=>{

    const {role}=req.user
    const bool=role.includes("admin") || role.includes("hospital") || role.includes("donor")
  if(!bool){
    next()
  }
    else{
        next(new ErrorHandler("you are not only a client user",401))
    }
})


