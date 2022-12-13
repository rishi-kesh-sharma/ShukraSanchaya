
const appointmentRequestBtn=document.querySelector("#appointment-request-btn")
const inputFields=document.querySelectorAll(".input-field")
const appointmentForField=document.querySelector("#appointment-for")


const requestAppointmentPost=(appointmentData)=>{
    axios.post("http://localhost:3000/api/appointment/",appointmentData).then((response)=>{
        if(response.status=200){
            alert("appointment successfull !!!")
            window.location.href="/"
        }else{
            alert("cannot make appointment !!!")
        }
        console.log(response.status)
    }).catch((err)=>{
        console.log(err)
        alert("cannot make appointment !!!")
    })
    
}

const validate=(appointmentDataArray)=>{
    let isValid=true;
    for(item of appointmentDataArray){
        if(item==""){
              isValid=false;
            break
        }

    }

    if(isValid){
      const  selectedIndex=appointmentForField.selectedIndex
      const appointmentForUserId=appointmentForField[selectedIndex].id
      console.log(appointmentForUserId)
        const appointmentData={appointmentForUserId, name:appointmentDataArray[0],email:appointmentDataArray[1],phone:appointmentDataArray[2],appointmentAs:appointmentDataArray[3],appointmentFor:appointmentDataArray[4],appointmentDate:appointmentDataArray[5],message:appointmentDataArray[6]}
        requestAppointmentPost(appointmentData)
    }
    else{
        alert("fields not filled properly")
    }
}
const handleAppointmentRequestBtn=(e)=>{
    e.preventDefault();
  const appointmentDataArray=  [...inputFields].map((inputField)=>{
    
        return inputField.value;
    })

  
   validate(appointmentDataArray)

}


appointmentRequestBtn.addEventListener("click",handleAppointmentRequestBtn)