

const removeBtns=document.querySelectorAll("td>i.remove-btn")


// const requestEditAction=(id,editedappointmentData)=>{
//     console.log(editedappointmentData)
//     axios.put(`http://localhost:3000/api/appointment/me/:id/${id}`,editedappointmentData).then((response)=>{
//         if(response.status==200){

//             window.location.reload()
//         }
//     }).catch((err)=>{
//         console.log(err)
//     })
// }
const requestRemoveAction=(id)=>{
    axios.delete(`http://localhost:3000/api/appointment/me/${id[0]}/${id[1]}`).then((response)=>{
        if(response.status==200){
            window.location.reload()
        }
    }).catch((err)=>{
        console.log(err)
    })
}

removeBtns.forEach((removeBtn)=>{
    const handleRemoveBtnClick=(e)=>{

        console.log()
        requestRemoveAction(removeBtn.id.split(","))
    }

    removeBtn.addEventListener("click",handleRemoveBtnClick)

})


    

