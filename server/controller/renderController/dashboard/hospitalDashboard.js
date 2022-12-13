// const axios=require("axios")
const axios=require("axios")

const showHospitalDashboardOverview=(req,res,next)=>{
  
    res.render("./pages/dashboard/hospitalDashboard/overview",{user:req.user})

}
const showHospitalDashboardRequestedAppointments=(req,res,next)=>{
   axios.get(`http://localhost:3000/api/appointment/hospital/me/${req.params.userId}/all`,
       {
            withCredentials:true,
            headers:{
            Cookie: `token=${req.cookies.token}`
        } 
     })
   .then((appointmentResponse)=>{
       const {appointments}=appointmentResponse.data

    res.render("./pages/dashboard/hospitalDashboard/requestedAppointments",{appointments,user:req.user})
       
})
.catch((err)=>{
    console.log(err)
})


}
const showHospitalDashboardAcceptedAppointments=(req,res,next)=>{
   axios.get(`http://localhost:3000/api/appointment/accepted/hospital/me/${req.params.userId}/all`,
       {
            withCredentials:true,
            headers:{
            Cookie: `token=${req.cookies.token}`
        } 
     })
   .then((appointmentResponse)=>{
       const {appointments}=appointmentResponse.data

    res.render("./pages/dashboard/hospitalDashboard/acceptedAppointments",{appointments,user:req.user})
       
})
.catch((err)=>{
    console.log(err)
})

}


const showHospitalDashboardRejectedAppointments=(req,res,next)=>{
   axios.get(`http://localhost:3000/api/appointment/rejected/hospital/me/${req.params.userId}/all`,
       {
            withCredentials:true,
            headers:{
            Cookie: `token=${req.cookies.token}`
        } 
     })
   .then((appointmentResponse)=>{
       const {appointments}=appointmentResponse.data

    res.render("./pages/dashboard/hospitalDashboard/rejectedAppointments",{appointments,user:req.user})
})
.catch((err)=>{
    console.log(err)
})
}


const updateAppointmentStatusAction=(req,res,next)=>{

    console.log(req.url.includes("accepted"))
    if(req.url.includes("accepted")){
        
        req.body={status:"accepted"}
    }else if(req.url.includes("rejected")){

        req.body={status:"rejected"}
    } else{
        req.body={status:"pending"}
    }

   axios.put(`http://localhost:3000/api/appointment/hospital/me/${req.params.userId}/${req.params.appointmentId}`,req.body,
       {
            withCredentials:true,
            headers:{
            Cookie: `token=${req.cookies.token}`
        } 
     })
   .then((appointmentResponse)=>{
       res.redirect(`/dashboard/hospital/appointments/${req.user._id}/all`)

       console.log(appointmentResponse.data)
})
.catch((err)=>{
    console.log(err)
})


}

module.exports={showHospitalDashboardRequestedAppointments,showHospitalDashboardOverview,showHospitalDashboardAcceptedAppointments,showHospitalDashboardRejectedAppointments,updateAppointmentStatusAction}