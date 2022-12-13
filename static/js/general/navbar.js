
const myAccountNavlink=document.querySelector('#my-account-nav-link')
const header=document.querySelector(".header")
const sidebar=document.querySelector(".header .nav-links")
const navbarOpenButton=document.querySelector("  .header .hamburger")
const navbarHideButton=document.querySelector(".header .nav-links .hide-sidebar-btn")

myAccountNavlink.addEventListener("click",(e)=>{
    myAccountNavlink.classList.toggle("show-dropdown")
})


navbarOpenButton.addEventListener("click",(e)=>{
    sidebar.classList.add("show-sidebar")
})



navbarHideButton.addEventListener("click",(e)=>{
    sidebar.classList.remove("show-sidebar")
})



// active nav link

const navLinks=document.querySelectorAll(".nav-link")
const dropdown=document.querySelector(".dropdown")
// console.log(navLink)

// console.log(window.location.pathname.replace("/",""))
window.addEventListener("load",(e)=>{
    navLinks.forEach((navLink)=>{
        if(navLink.id==window.location.pathname.replace("/","")){
            if(!navLink.classList.contains("active")){
                navLink.classList.add("active")
                if(navLink.classList.contains("dropdown-item")){
                   if(!dropdown.classList.contains("active")) 
                   {

                       dropdown.classList.add("active")
                       
                   }
                }
    
            }
        }
     

        else{
            navLink.classList.remove("active")
        }
    })
})


