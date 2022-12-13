const mongoose=require("mongoose")
const Appointment = require("./appointments")
const User = require("./user")

const hospitalSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        required:true,
        ref:"User"
    },
    
    estd:{
        type:Date,
        required:true,
        default:Date.now()
    },

    description:{
       type:String,
       default:"this is hospital"
    }

})

hospitalSchema.post("save",async function(){
    let user=await User.findById(this.user)
    user.role=["user","hospital"]
     await  user.save()
     console.log("hospital role added")
})

// update role after removing 
hospitalSchema.post("remove",async function(){
    let appointment=await Appointment.deleteMany({appointmentFor:this.user})
    console.log(appointment)
    console.log("appointment created for hospital removed")
    // await user.remove()
    console.log("hospital removed from hospital schema")
})

hospitalSchema.post("find",async function(result){
    const users = result.map((item)=>{
           if(item.populated("user")){
  
               if( item.user==null || item.user==undefined){
                  return item.user={}
               }else{
                  return item.user
               }
           }else{
              return item
           }
          
      })
      
  })

const Hospital=mongoose.model("HospitalInfo",hospitalSchema);
module.exports= Hospital