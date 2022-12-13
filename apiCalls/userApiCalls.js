const axios=require("axios")
const getUserDetails=()=>{
   axios.get("/api/user/me")
   .then((response)=>{
    console.log(response)
   })



}
module.exports={getUserDetails}