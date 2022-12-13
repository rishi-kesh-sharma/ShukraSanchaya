const textField=document.querySelector(".text-center")
const text="“Beautiful things happen when you believe, just open your heart and your mind to conceive.” "
// console.log(text)
// var audio =  document.querySelector("#audio")
window.addEventListener("load",(e)=>{
//    audio.play()

    const letterArray=  text.split("");
    let index=0;
    const interval=setInterval(()=>{
        // console.log(letterArray[index])
        const letterSpan=document.createElement("span")
        letterSpan.innerHTML=letterArray[index]
        textField.appendChild(letterSpan)
        index=index+1
        
        
        if(index>=letterArray.length){
            clearInterval(interval)
        }
    },40)
    
    
})