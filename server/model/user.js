const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const Auth = require("./auth")
const Appointment = require("./appointments")
// CREATE SCHEMA FOR USER
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
        
    },
    address:{
        type:String,
        required:true,
        lowercase:true
    },
    avatar:{
        type:String,
        default:"this is default avatar",
    },
    role:{
        type:[String],
        enum:["user","client","admin","donor","hospital"],
        default:["user","client"],
        required:true
    },
    auth:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    }
    
})


UserSchema.methods.getJWTToken=async function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

UserSchema.post("remove",async function(){
    const auth=await Auth.findById(this.auth)
    await Appointment.deleteMany({createdBy:this._id})
    await auth.remove()
   console.log("all removed")
})

const User=mongoose.model("User",UserSchema)
module.exports=User;
