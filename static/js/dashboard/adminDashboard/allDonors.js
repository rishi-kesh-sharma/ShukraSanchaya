
const removeBtns=document.querySelectorAll("td>i.remove-btn")
const editBtns=document.querySelectorAll("td>i.edit-btn")



const requestEditAction=(id,editedDonorData)=>{
    console.log(editedDonorData)
    axios.put(`http://localhost:3000/api/user/admin/${id}`,editedDonorData).then((response)=>{
        if(response.status==200){
            window.location.reload()
        }
    }).catch((err)=>{
        console.log(err)
    })
}
const requestRemoveAction=(id)=>{
    axios.delete(`http://localhost:3000/api/donor/admin/${id}`).then((response)=>{
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
    
 const donorDataFields=editBtn.parentNode.parentNode.querySelectorAll("td.donor-data")
const handleEditBtnClick=(e)=>{
const donorDataArray= [...donorDataFields].map((donorDataField)=>{
      return  donorDataField.innerText.replace("/n","").trim()
    })
const donorData={name:donorDataArray[0],email:donorDataArray[1],phone:parseInt(donorDataArray[2]),address:donorDataArray[3],}
    requestEditAction(editBtn.id,donorData)
    
}
    editBtn.addEventListener("click",handleEditBtnClick)
})
