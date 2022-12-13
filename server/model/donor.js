const mongoose=require("mongoose");
const Appointment = require("./appointments");
const User = require("./user");

const donorSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        unique:true,
        required:true,
        ref:"User"
    },
    DOB:{
        type:Date,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    siblings:{
        type:Number,
    },
    isMarried:{
        type:Boolean,
        required:true,
    },
    isHealthyMale:{
        type:Boolean,
        required:true
    },
    noOfSiblings:{
      type:Number,
      required:true,
    },
    hasDonatedBefore:{
        type:Boolean,
        required:true,
    },
    hasChronicDisease:{
        type:Boolean,
        required:true,
    },
    hasSTDs:{
        type:Boolean,
        required:true,
    },
    educationalQualification:{
        type:String,
        enum:["completed a professional certificate post high school diploma",
               "completed course in a 2 or 4 year program",
               "completed AA program",
               "completed BA/BS",
               "completed masters degree",
               "completed bachelor degree"
          ],
        required:true,
    },
    howCameInContact:{
        type:String,
        required:true,
        lowercase:true,
        enum:["social media","someone's recommendation","peers","google","newspaper","event","website","other"]
    },
    race:{
        type:String,
        required:true,
        lowercase:true,
        enum:["asian","caucasian","mongolian","latino","negro","multi"]
    },

    description:{
       type:String,
    }

})

//update role before saving

donorSchema.post("save",async function(){
    let user=await User.findById(this.user)
    user.role=["user","client","donor"]
      await  user.save()
      console.log("donor role added to donor")

})

// update role after removing 
donorSchema.pre("remove",async function(){
        let user=await User.findById(this.user)
        let appointmentsAsDonor=await Appointment.find({createdBy:this.user,appointmentAs:"donor"})
        appointmentsAsDonor.forEach(async(item)=>{
           await item.remove()
           console.log("appointment created by"+this.name+" is removed as donor")
       
    })

    user.role=["user","client"]
    console.log("donor role removed from donor")
    await user.save()
})

donorSchema.post("find",async function(result){
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

const Donor=mongoose.model("DonorInfo",donorSchema);
module.exports= Donor