const teamData=[
    [
        {
 
            type:"name",
            value:"rishikesh sharma",
        },
        {
            
         type:"age",
         value:22,
        },
        {
 
         value:"wrongdirection@gmail.com",
            type:"email",
        },
 
        {
         value:"987654321",
            type:"phone",
 
        },
         {
 
             type:"department",
             value:"Web Development",
         },
        {
            type:"address",
     
            value:"lalitpur.",
 
        }
 
 
 
     ],
    [
        {
 
            type:"name",
            value:"Hansika Jha",
        },
        {
            
         type:"age",
         value:22,
        },
        {
 
         type:"email",
         value:"hansika@gmail.com",
        },
 
        {
         type:"phone",
         value:"9876543210",
 
        },
         {
 
             type:"department",
             value:"Designing",
         },
        {
            type:"address",
     
            value:"kathmandu",
 
        }
 
 
 
     ],
    [
        {
 
            type:"name",
            value:"Menuka Lamsal",
        },
        {
            
         type:"age",
         value:22,
        },
        {
 
         value:"menuka@gmail.com",
            type:"email",
        },
 
        {
         value:"9876543210",
            type:"phone",
 
        },
         {
 
             type:"department",
             value:"Marketing",
         },
        {
            type:"address",
     
            value:"Pokhara",
 
        }
 
 
 
     ],

 ]
 
 const icons=document.querySelectorAll(".icons");
 const infoDisplayer=document.querySelectorAll(".info-displayer");
 // console.log(infoDisplayer);
 // console.log(icons[0])
 
//  teamData.forEach((teamMember)=>{
  
    
// })


// teamMember.forEach((memberInfo)=>{
//     icons.forEach((icon)=>{

//         icon.addEventListener("mouseover",(e)=>{
//             var currentDisplayer;
        
        
//             console.log()
// if(memberInfo.type==e.currentTarget.querySelector("i").classList[3]){
// currentDisplayer=e.currentTarget.parentNode.parentNode.querySelector(".info-displayer")

// currentDisplayer.innerHTML=memberInfo.value;

 
// }
            
//         })
//     })
// })


icons.forEach((icon,index)=>{
    console.log(icon.children)
    const childrens=icon.children;
   [...childrens].forEach((singleIcon)=>{
         singleIcon.addEventListener("mouseover",(e)=>{
        
            var currentDisplayer;
            
            currentDisplayer=e.currentTarget.parentNode.parentNode.querySelector(".info-displayer")
            // console.log(teamData[index])
            teamData[index].forEach((info)=>{
                const {type,value}=info
                if(type==e.currentTarget.querySelector("i").classList[3]){
                    currentDisplayer.innerHTML=value;
            
            }
            })
            
          
        })
    })
   
})