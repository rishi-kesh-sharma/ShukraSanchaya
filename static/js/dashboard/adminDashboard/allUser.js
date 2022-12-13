
const removeBtns=document.querySelectorAll("td>i.remove-btn")
const editBtns=document.querySelectorAll("td>i.edit-btn")


const requestEditAction=(id,editedUserData)=>{
    console.log(editedUserData)
    axios.put(`http://localhost:3000/api/user/admin/${id}`,editedUserData).then((response)=>{
        if(response.status==200){

            window.location.reload()
        }
    }).catch((err)=>{
        console.log(err)
    })
}
const requestRemoveAction=(id)=>{
    axios.delete(`http://localhost:3000/api/user/admin/${id}`).then((response)=>{
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
    const userDataFields=editBtn.parentNode.parentNode.querySelectorAll("td.user-data")
const userDataArray= [...userDataFields].map((userDataField)=>{
      return  userDataField.innerText.replace("/n","").trim()
    })
    
const userData={name:userDataArray[0],email:userDataArray[1],phone:parseInt(userDataArray[2]),address:userDataArray[3],role:userDataArray[4].split(",")}

    requestEditAction(editBtn.id,userData)
    
}

    editBtn.addEventListener("click",handleEditBtnClick)
})
