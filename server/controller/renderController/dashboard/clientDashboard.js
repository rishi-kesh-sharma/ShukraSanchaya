// const axios=require("axios")
const axios=require("axios")

const showClientDashboardOverview=(req,res,next)=>{
  
    res.render("./pages/dashboard/clientDashboard/overview",{user:req.user})

}
const showClientDashboardMyAppointments=(req,res,next)=>{
   axios.get(`http://localhost:3000/api/appointment/me/all`,
       {
            withCredentials:true,
            headers:{
            Cookie: `token=${req.cookies.token}`
        } 
     })
   .then((appointmentResponse)=>{
       const {data}=appointmentResponse

    res.render("./pages/dashboard/clientDashboard/myAppointments",{appointments:data,user:req.user})
       
})
.catch((err)=>{
    console.log(err)
})





}
const showClientDashboardDeleteAccountConfirmationForm=(req,res,next)=>{
  
    res.render("./pages/dashboard/clientDashboard/deleteAccount",{user:req.user})



}

const deleteAccountAction=(req,res,next)=>{
    axios.delete(`http://localhost:3000/api/user/me/${req.params.userId}`,
    {
         withCredentials:true,
         headers:{
         Cookie: `token=${req.cookies.token}`
     } 
  })
.then((response)=>{
   console.log(response)
   res.redirect("/login")
    
})
.catch((err)=>{
 console.log(err)
})

}
// const showAdminDashBoardAllDonors=(req,res,next)=>{
//     axios.get(`http://localhost:3000/api/donor/admin/all?keyword=${req.query.keyword || ""}&page=${req.query.page || 1}`,
//     {
//          withCredentials:true,
//          headers:{
//          Cookie: `token=${req.cookies.token}`
//      } 
//     })
//     .then((response)=>{
//         const {donors,prev,next,skip}=response.data
//     res.render("./pages/dashboard/adminDashboard/allDonors",{user:req.user,donors,next,prev,skip})
//     })
//     .catch((err)=>{
//     console.log(err)
//     })
// }
// const showAdminDashBoardAllContacts=(req,res,next)=>{
//     axios.get(`http://localhost:3000/api/contact/admin/all?keyword=${req.query.keyword || ""}&page=${req.query.page || 1}`,
//     {
//          withCredentials:true,
//          headers:{
//          Cookie: `token=${req.cookies.token}`
//      } 
//     })
//     .then((response)=>{
//         const {contacts,next,prev,skip}=response.data
//     res.render("./pages/dashboard/adminDashboard/allContacts",{user:req.user,contacts,next,prev,skip})
//     })
//     .catch((err)=>{
//     console.log(err)
//     })
// }


// const showAdminDashBoardRegisterHospital=(req,res,next)=>{
//     res.render("./pages/dashboard/adminDashboard/registerHospital",{user:req.user})
//    }

   
// //    register hospital form process
//    const processRegisterHospitalForm=(req,res,next)=>{

//     const {name,email,phone,address,avatar,estd,description,password,confirmPassword}=req.body
//     const userInfo={name,email,phone,address,avatar,password,confirmPassword}
//     const hospitalInfo={estd,description}
//     req.body.hospitalInfo=hospitalInfo;
//     req.body.userInfo=userInfo
//     axios.post(`http://localhost:3000/api/hospital/admin/register`,req.body,
//     {
//          withCredentials:true,
//          headers:{
//          Cookie: `token=${req.cookies.token}`
//      } 
//     })
//     .then((response)=>{
//         res.redirect("/dashboard/admin/users/all?page=1")
//     })
//     .catch((err)=>{
//         console.log(err.response)
//         console.log("error message is here "+  +err.response.status)
//         res.render("./pages/error/error",{message:"this is error",status:err.response.status})
//     })
// }

module.exports={showClientDashboardMyAppointments,showClientDashboardDeleteAccountConfirmationForm,showClientDashboardOverview,deleteAccountAction}

