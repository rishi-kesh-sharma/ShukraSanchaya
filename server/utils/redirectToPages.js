module.exports=(res)=>{
   console.log(res.apiResponse)
   if(res.apiResponse.status==200 && res.apiResponse.data.success){
      if(res.apiResponse.data.action=="login"){

         console.log("in login ")
         res.cookie("token",res.apiResponse.data.token).redirect("/")
      }
     else if(res.apiResponse.data.action=="logout"){
          
         console.log("in logout ")
        res.clearCookie("token").redirect("/")
         res.redirect("/")
      }else{
         res.redirect("/")
      }
   }else{
      const {message}=res.apiResponse.data;
      res.render("./pages/error/error.ejs",{message,status:res.apiResponse.status})
   }
}
