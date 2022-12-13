
const removeBtns=document.querySelectorAll("td>i.remove-btn")
const editBtns=document.querySelectorAll("td>i.edit-btn")


// request edit action
const requestEditAction=(id,editedAppointmentData)=>{
    axios.put(`http://localhost:3000/api/appointment/admin/${id}`,editedAppointmentData).then((response)=>{
        if(response.status==200){

            window.location.reload()
        }
    }).catch((err)=>{
        console.log(err)
    })
}

// request remove action
const requestRemoveAction=(id)=>{
    axios.delete(`http://localhost:3000/api/appointment/admin/${id}`).then((response)=>{
        console.log(response.data)
        if(response.status==200){
            window.location.reload()
        }
        
    }).catch((err)=>{
        console.log(err)
    })
}


removeBtns.forEach((removeBtn)=>{
    const handleRemoveBtnClick=(e)=>{
        requestRemoveAction(removeBtn.id)
    }

    removeBtn.addEventListener("click",handleRemoveBtnClick)

})


editBtns.forEach((editBtn)=>{
    
const handleEditBtnClick=(e)=>{
    const appointmentDataFields=editBtn.parentNode.parentNode.querySelectorAll("td.appointment-data")

  const appointmentDataArray= [...appointmentDataFields].map((appointmentDataField)=>{
    if (appointmentDataField.id){
        return appointmentDataField.id
     }
      return  appointmentDataField.innerText.replace("/n","").trim()
    })
    
    const appointmentData={status:appointmentDataArray[0],name:appointmentDataArray[1],email:appointmentDataArray[2],phone:parseInt(appointmentDataArray[3]),appointmentFor:appointmentDataArray[4],appointmentDate:appointmentDataArray[5],appointmentAs:appointmentDataArray[6],creatorInfo:{creatorName:appointmentDataArray[7],creatorEmail:appointmentDataArray[8],creatorPhone:appointmentDataArray[9]},creatorRole:appointmentDataArray[10].split(","), createdAt:appointmentDataArray[11]}

    console.log(appointmentData)
    requestEditAction(editBtn.id,appointmentData)
    
}
    editBtn.addEventListener("click",handleEditBtnClick)
})


