const mongoose=require("mongoose")

const appointmentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        required:true,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true,
    },
    appointmentAs:{
        type:String,
        default:"client",
        required:true,
        enum:["client","donor"]
    },
    appointmentFor:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"

    },
    appointmentDate:{
        type:Date,
        required:true

    },
   
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
})


// return {} if the hospital appointment for is populated but returns null

appointmentSchema.post("find",async function(result){
  const appointments = result.map((item)=>{
         if(item.populated("createdBy")){

             if( item.createdBy==null || item.createdBy==undefined){
                return item.createdBy={}
             }else{
                return item.createdBy
             }
         }else{
            return item
         }
        
    })
    
})

appointmentSchema.post("find",async function(result){
  const appointments = result.map((item)=>{
         if(item.populated("appointmentFor")){

             if( item.appointmentFor==null || item.appointmentFor==undefined){
                return item.appointmentFor={}
             }else{
                return item.appointmentFor
             }
         }else{
            return item
         }
        
    })
    
})

const Appointment=mongoose.model("appointments",appointmentSchema)



module.exports=Appointment