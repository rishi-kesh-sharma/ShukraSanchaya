
const loginBtn=document.querySelector("#login-btn")
const emailField=document.querySelector("#email")
const passwordField=document.querySelector("#password")

loginBtn.addEventListener("click",(e)=>{

  e.preventDefault()

  const email=emailField.value;
  const password=passwordField.value;


  axios.post("/api/auth/login",{email,password})
  .then((res)=>{
    window.location.href="/"
  })
  .catch((err)=>{

    console.log(err)
  })
  
})     


