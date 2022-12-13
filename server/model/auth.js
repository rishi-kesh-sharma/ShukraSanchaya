const mongoose=require("mongoose")
const CryptoJs=require("crypto-js")

// CREATE SCHEMA FOR USER
const AuthSchema=mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

AuthSchema.pre("save",function(){
         const hashedPassword=  CryptoJs.AES.encrypt(this.password, process.env.PASSWORD_SECRET_KEY).toString();
         this.password=hashedPassword
})

// compare password statics

AuthSchema.statics.comparePassword=async function(enteredPassword,encryptedPassword){
    const decryptedPassword=CryptoJs.AES.decrypt(encryptedPassword,process.env.PASSWORD_SECRET_KEY).toString(CryptoJs.enc.Utf8)
    return decryptedPassword==enteredPassword;
}
const Auth=mongoose.model("Auth",AuthSchema)
 
module.exports=Auth;