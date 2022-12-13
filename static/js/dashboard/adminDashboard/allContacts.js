
const removeBtns=document.querySelectorAll("td>i.remove-btn")
const editBtns=document.querySelectorAll("td>i.edit-btn")


const requestRemoveAction=(id)=>{
    axios.delete(`http://localhost:3000/api/contact/admin/${id}`).then((response)=>{
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

