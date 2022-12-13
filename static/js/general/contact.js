
const submitBtn=document.querySelector("#submit-btn")
const nameField=document.querySelector("#name")
const emailField=document.querySelector("#email")
const countryField=document.querySelector("#country")
const descriptionField=document.querySelector("#description")

const inputFields=document.querySelectorAll(".input-field")


const requestPost=(name,email,country,description)=>{
    const data={name,email,country,description}
    axios.post("/api/contact/",data)
    .then((response)=>{
        if(response.status==200){
            alert("message posted successfully")
            window.location.href="/"
        }
        else{
            alert ("cannot post message !!!try again")
        }
    })
}
const handleSubmit=(e)=>{
   e.preventDefault()

   const name=nameField.value
   const email=emailField.value
   const country=countryField.value
   const description=descriptionField.value

   requestPost(name,email,country,description)
}

submitBtn.addEventListener("click",handleSubmit)
