
window.addEventListener('load', ()=>{
    
    //handle flash
    setTimeout(()=>{
        try{
        document.querySelector('.alert')
       .style.display='none';
        }catch{
            console.log('no alert');
        } 
    }, '3000');
    
});