
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.addEventListener("click",function() {
    sidebar.classList.toggle("active");
    if(sidebar.classList.contains("active")){
    sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
  }else
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }) 



  // search functionality

const searchBox=document.querySelector(".search-box>input[type='text']")
const searchIcon=document.querySelector(".search-box>i.bx-search")


// const new URLSearchParams=(searchString)=>{

//   const searchParams=new URLSearchParams(searchString);
//   return searchParams
  
// }

const keyword=new URLSearchParams(window.location.search).get("keyword")
const page=new URLSearchParams(window.location.search).get("page")

searchBox.value=keyword
searchBox.focus()
const waitTime=1200;
let timer;



const requestSearch=(keyword)=>{
  let page=new URLSearchParams(window.location.search).get("page")
  page=parseInt(page)

  window.location.href=`${window.location.pathname}?keyword=${keyword}&page=1`
}

const handleSearch=(e)=>{
  let keyword=e.target.value
  
  // Wait for X ms and then process the request
  
  clearTimeout(timer);
  // if(timer){

  // }
   timer = setTimeout(() => {
    requestSearch(keyword)
  }, waitTime);
  
  // searchBox.value=params
}
searchBox.addEventListener('keyup', handleSearch);



// next-prev functionality

const nextBtn=document.querySelector(".btns .next-btn")
const prevBtn=document.querySelector(".btns .prev-btn")

nextBtn.addEventListener("click",(e)=>{
let keyword=new URLSearchParams(window.location.search).get("keyword")
let page=new URLSearchParams(window.location.search).get("page")
page=parseInt(page)
  window.location.href=`${window.location.pathname}?keyword=${keyword || ""}&page=${page+1}`

})

prevBtn.addEventListener("click",(e)=>{

let keyword=new URLSearchParams(window.location.search).get("keyword")
let page=new URLSearchParams(window.location.search).get("page")
page=parseInt(page)

window.location.href=`${window.location.pathname}?keyword=${keyword || ""}&page=${page-1}`

})
