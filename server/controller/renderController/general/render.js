const axios=require("axios")
const { sendResponse } = require("../../../utils/sendResponse")


// logout user

const logoutUser=(req,res,next)=>{

    axios.get("http://localhost:3000/api/auth/logout",
    {
        withCredentials:true,
        headers:{
        Cookie: `token=${req.cookies.token}`
    } 
}
    )
    .then((response)=>{
       const {tokenName,tokenValue,metaData}=response.data
        if(response.status==200){
            console.log(response.data)
           res.cookie(tokenName,tokenValue,{expires:new Date(Date.now()),httpOnly:true}).redirect("/login")
        }
    })
    .catch((err)=>{
        sendResponse(res,400,{success:false,message:"cannot logout user!!!"})
        console.log(err)

    })
}

const showHomePage=(req,res,next)=>{
   res.render('./pages/general/home',{user:req.user,id:"home"})
}

const showRegisterPage=async(req,res,next)=>{
    res.render("./pages/general/register")
}

const showLoginPage=(req,res,next)=>{

    res.render("./pages/general/login")
}

const showContactPage=(req,res,next)=>{

    res.render("./pages/general/contact",{user:req.user,id:"contact"})
}
const showAboutPage=(req,res,next)=>{
    res.render("./pages/general/about",{user:req.user,id:"about"})
}
const showAppointmentPage=(req,res,next)=>{
       axios.get("http://localhost:3000/api/hospital/all",{
        withCredentials:true,
        headers:{
            Cookie:`token=${req.cookies.token}`
        }
       })
       .then((response)=>{

        console.log(response.data)
             const {hospitals}=response.data
           res.render("./pages/general/appointment",{user:req.user,hospitals,id:"appointment"})
       })
       .catch((err)=>{
         console.log(err)
       })
}

const showProfilePage= (req,res,next)=>{
   
    res.render("./pages/general/profile",{user:req.user,id:"profile"})
}

const showDonorRegistrationPage=(req,res,next)=>{

    res.render("./pages/general/donorRegistration",{user:req.user,id:"register-donor"})
}


module.exports={showHomePage,showRegisterPage,showLoginPage,showContactPage,showDonorRegistrationPage,showProfilePage,showAboutPage,showAppointmentPage,logoutUser}