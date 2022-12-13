const axios=require("axios")
const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const Hospital = require("../../model/hospital")
const User = require("../../model/user")
const ApiFeatures = require("../../utils/apiFeatures")
const {sendResponse}=require("../../utils/sendResponse")


// REGISTER HOSPITAL
exports.registerHospital=catchAsyncErrors( async(req,res,next)=>{
   
   const response=  await axios.post("http://localhost:3000/api/auth/register",
     req.body.userInfo,
     {
        withCredentials:true,
        headers:{
            Cookie:`token=${req.cookies.token}`
        }
     }
     );
     const hospital=new Hospital({user:response.data.user._id,...req.body.hospitalInfo})

     await hospital.save()
     
    sendResponse(res,200,{success:true,message:"hospital successfully registered"})
})


// GET ALL HOSPITAL
exports.getAllHospital=catchAsyncErrors(async(req,res,next)=>{

    
    const resultPerPage=11;
    // User.collection.update({_id: user._id}, {$unset: {field: 1 }});
    // let hospitals=allHospitals.map((item)=>{
    //     return item.user
    // })
    let apiFeature1= new ApiFeatures(User.where({role:["user hospital"]}),req.query).search()
    let allHospitals=await apiFeature1.query
    const totalHospitals=allHospitals.length

    const apiFeature2= new ApiFeatures(User.where({role:["user","hospital"]}),req.query).search().pagination(resultPerPage)
     const  hospitals= await apiFeature2.query;
    const isNext=  parseInt(req.query.page)*resultPerPage < totalHospitals && totalHospitals > resultPerPage
    sendResponse(res,200,{success:true,hospitals,next:isNext,prev: apiFeature2.prev,skip:apiFeature2.skip})
})



// GET SINGLE HOSPITAL
exports.getSingleHospital=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.userId)
  
    const hospital=await Hospital.findOne({userId:req.params.userId})

    if(!hospital){
       sendResponse(res,200,{success:false,data:"hospital not found"})
    }
    else{

        const hospitalAllInfo={userInfo:user,hospitalInfo:hospital}

        sendResponse(res,200,{success:true,hospitalInfo:hospitalAllInfo})
    }
    
})

// UPDATE HOSPITAL


exports.updateHospital=catchAsyncErrors(async(req,res,next)=>{
    await Hospital.updateOne({userId:req.params.userId},{
        $set:req.body
    })
    sendResponse(res,200,{success:true,message:"hospital updated successfully!!!"})
})


// DELETE HOSPITAL
exports.deleteHospital=catchAsyncErrors(async(req,res,next)=>{
    // await Hospital.deleteOne({userId:req.params.userId})
    const response=await axios.delete(`http://localhost:3000/api/user/admin/${req.params.userId}`,{
        headers:{
            Cookie:`token=${req.cookies.token}`
        }
    })
   if(response.status==200){
    sendResponse(res,200,{success:true,message:"hospital is deleted successfully!!!"})
   }
})


