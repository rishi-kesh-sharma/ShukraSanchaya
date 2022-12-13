
const removeBtns=document.querySelectorAll("td>i.remove-btn")
const editBtns=document.querySelectorAll("td>i.edit-btn")


const requestEditAction=(id,editedHospitalData)=>{
    console.log(editedHospitalData)
    axios.put(`http://localhost:3000/api/user/admin/${id}`,editedHospitalData).then((response)=>{
        if(response.status==200){
            window.location.reload()
        }
    }).catch((err)=>{
        console.log(err)
    })
}
const requestRemoveAction=(id)=>{
    axios.delete(`http://localhost:3000/api/hospital/admin/${id}`).then((response)=>{
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
    
const hospitalDataFields=editBtn.parentNode.parentNode.querySelectorAll("td.hospital-data")
const handleEditBtnClick=(e)=>{
const hospitalDataArray= [...hospitalDataFields].map((hospitalDataField)=>{
      return  hospitalDataField.innerText.replace("/n","").trim()
    })
    
const hospitalData={name:hospitalDataArray[0],email:hospitalDataArray[1],phone:parseInt(hospitalDataArray[2]),address:hospitalDataArray[3],}

    requestEditAction(editBtn.id,hospitalData)
    
}

    editBtn.addEventListener("click",handleEditBtnClick)
})
