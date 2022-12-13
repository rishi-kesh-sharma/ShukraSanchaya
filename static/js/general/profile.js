
const profileNavBtn=document.querySelector("#profile-nav-btn")
const editProfileNavBtn=document.querySelector("#edit-profile-nav-btn")
const changePasswordNavBtn=document.querySelector("#change-password-nav-btn")

const profileCard=document.querySelector(".profile-card")
const editProfileCard=document.querySelector(".edit-profile-card")
const changePasswordCard=document.querySelector(".change-password-card")

profileNavBtn.addEventListener("click",(e)=>{


    if(!profileNavBtn.classList.contains("active")){
        profileNavBtn.classList.add("active")
        editProfileNavBtn.classList.remove("active")
        changePasswordNavBtn.classList.remove("active")
    }
    if(!profileCard.classList.contains("active")){
        profileCard.classList.add("active")
        editProfileCard.classList.remove("active")
        changePasswordCard.classList.remove("active")
    }
})
editProfileNavBtn.addEventListener("click",(e)=>{
    
    if(!editProfileNavBtn.classList.contains("active")){
        editProfileNavBtn.classList.add("active")
        profileNavBtn.classList.remove("active")
        changePasswordNavBtn.classList.remove("active")
    }
    if(!editProfileCard.classList.contains("active")){
        editProfileCard.classList.add("active")
        profileCard.classList.remove("active")
        changePasswordCard.classList.remove("active")
    }
})
changePasswordNavBtn.addEventListener("click",(e)=>{
    
    if(!changePasswordNavBtn.classList.contains("active")){
        changePasswordNavBtn.classList.add("active")
        profileNavBtn.classList.remove("active")
        editProfileNavBtn.classList.remove("active")
    }
    if(!changePasswordCard.classList.contains("active")){
        changePasswordCard.classList.add("active")
        editProfileCard.classList.remove("active")
        profileCard.classList.remove("active")
    }
})


// save edited profile request

const saveProfileBtn=document.querySelector("#save-profile-btn")

const nameField=document.querySelector("#name")
const addressField=document.querySelector("#address")
const emailField=document.querySelector("#email")
const phoneField=document.querySelector("#phone")


    
    // save user profile request or update user profile

//     const requestRegister=(nameValue,emailValue,phoneValue,addressValue)=>{
    
//         const userData={name:nameValue,email:emailValue,phone:phoneValue,address:addressValue}
       
//         axios.put("http://localhost:3000/api/user/me",userData)
//         .then((response)=>{
//          console.log(response)
//          alert("user updated successfully")
//          window.location.href="/"
//         })
//         .catch((err)=>{
//          console.log(err)
//         })
           
//        }
       
// const validateUser=(nameValue,emailValue,phoneValue,addressValue)=>{
// if(!nameValue||!emailValue||!phoneValue||!addressValue)
// {
//     window.alert("fields are not filled completely")
    
// }

// else{
//     requestRegister(nameValue,emailValue,phoneValue,addressValue)
// }
// }
// const handleSubmit=(e)=>{
//     e.preventDefault()

//     let nameValue=nameField.value;
//     let emailValue=emailField.value;
//     let phoneValue=phoneField.value;
//     let addressValue=addressField.value;
    
//     validateUser(nameValue,emailValue,phoneValue,addressValue)



// }
// saveProfileBtn.addEventListener("click",handleSubmit)



// // change password request

// const changePasswordRequestBtn=document.querySelector("#change-password-btn")
// const oldPasswordField=document.querySelector("#old-password")
// const newPasswordField=document.querySelector("#new-password")
// const confirmPasswordField=document.querySelector("#confirm-password")

// const requestChangePassword=(oldPassword,newPassword,confirmPassword)=>{
//     const data={oldPassword,newPassword,confirmPassword}
//     axios.put("/api/user/me/password",data)
//     .then((response)=>{
//         if(response.status==200){
//           window.alert("password updated successfully")
//           window.location.href="/profile"
//         }
//         else{
//             window.alert("cannot update password !!try again")
//         }
//     })
//     .catch((err)=>{
//         console.log(err)
//     })

// }

// const handleChangePassword=(e)=>{

//     e.preventDefault()

//     const oldPassword=oldPasswordField.value;
//     const newPassword=newPasswordField.value;
//     const confirmPassword=confirmPasswordField.value;
//     if(!oldPassword || !newPassword || !confirmPassword){
//         alert("fields not filled properly")
//     }
//     else if(newPassword!=confirmPassword){
//         alert("passwords not matching")
//     }
//     else{

//        const isSure= window.confirm("are you sure you want to update password?")

//        isSure && requestChangePassword(oldPassword,newPassword,confirmPassword)
//     }

// }

// changePasswordRequestBtn.addEventListener("click",handleChangePassword)


