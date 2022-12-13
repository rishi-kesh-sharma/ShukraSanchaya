
// import axios from "axios"
const registerBtn=document.querySelector("#register-btn")
const nameField=document.querySelector("#name")
const passwordField=document.querySelector("#password")
const addressField=document.querySelector("#address")
const emailField=document.querySelector("#email")
const phoneField=document.querySelector("#phone")
const confirmPasswordField=document.querySelector("#confirm-password")

const requestRegister=(nameValue,emailValue,phoneValue,addressValue,passwordValue,confirmPasswordValue)=>{
    
 const userData={name:nameValue,email:emailValue,phone:phoneValue,address:addressValue,password:passwordValue,confirmPassword:confirmPasswordValue}

 axios.post("/api/user/register",userData)
 .then((response)=>{
  console.log(response)
 })
 .catch((err)=>{
  console.log(err)
 })
    
}
    
    
        
       
const validateUser=(nameValue,emailValue,phoneValue,addressValue,passwordValue,confirmPasswordValue)=>{
if(!nameValue||!emailValue||!phoneValue||!addressValue||!passwordValue||!confirmPasswordValue)
{
    window.alert("fields are not filled completely")
    
}
else if(passwordValue!==confirmPasswordValue){
    window.alert("passwords not matching!! please try again")
}
else{
    requestRegister(nameValue,emailValue,phoneValue,addressValue,passwordValue,confirmPasswordValue)
}
}
const handleSubmit=(e)=>{
    e.preventDefault()

    let nameValue=nameField.value;
    let emailValue=emailField.value;
    let addressValue=addressField.value;
    let phoneValue=phoneField.value;
    let passwordValue=passwordField.value;
    let confirmPasswordValue=confirmPasswordField.value;
    
    validateUser(nameValue,emailValue,phoneValue,addressValue,passwordValue,confirmPasswordValue)



}
registerBtn.addEventListener('click',handleSubmit)