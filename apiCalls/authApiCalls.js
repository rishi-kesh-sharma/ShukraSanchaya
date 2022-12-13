const axios=require("axios")
   

exports.registerUser=async(req)=>{
   try{
      const response=await axios.post(`http://localhost:3000/api/auth/register`,req.body )
      return response
   }catch(err){
      return err.response
   }
}

exports.loginUser=async(req)=>{
   try{
      const response=await axios.post(`http://localhost:3000/api/auth/login`,req.body )
      return response
   }catch(err){
      return err.response
   }
}
exports.logoutUser=async(req)=>{
   try{
      const response=await axios.get(`http://localhost:3000/api/auth/logout`,{
         withCredentials:true,
         headers:{
         Cookie: `token=${req.cookies.token}`
     } 
 } )
      return response
   }catch(err){
      return err.response
   }
}
exports.registerDonor=async(req)=>{
   try{
      const response=await axios.post(`http://localhost:3000/api/donor/register`,req.body,{
         withCredentials:true,
         headers:{
         Cookie: `token=${req.cookies.token}`
     } 
 } )
      return response
   }catch(err){
      return err.response
   }
}


exports.createAppointment=async(req)=>{
   try{
      const response=await axios.post(`http://localhost:3000/api/appointment/`,req.body,{
         withCredentials:true,
         headers:{
         Cookie: `token=${req.cookies.token}`
     } 
 } )
      return response
   }catch(err){
      return err.response
   }
}
exports.createContact=async(req)=>{
   try{
      const response=await axios.post(`http://localhost:3000/api/contact/`,req.body,{
         withCredentials:true,
         headers:{
         Cookie: `token=${req.cookies.token}`
     } 
 } )
      return response
   }catch(err){
      return err.response
   }
}
exports.updateProfile=async(req)=>{
   try{

      const response=await axios.put(`http://localhost:3000/api/user/me/${req.params.userId}`,req.body,{
         withCredentials:true,
         headers:{
            Cookie: `token=${req.cookies.token}`
         } 
      } )
      return response
   }catch(err){
      return err.response
   }
}

exports.updateUserPassword=async(req)=>{
   try{
      const response=await axios.put(`http://localhost:3000/api/user/me/password`,req.body,{
         withCredentials:true,
         headers:{
         Cookie: `token=${req.cookies.token}`
     } 
 } )
      return response
   }catch(err){
      return err.response
   }
}


   