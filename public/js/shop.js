window.addEventListener('load', ()=>{

    //handle menu bar
    document.querySelector('#menu-button')
    .addEventListener('click', (event)=>{
        event.target.style.display='none';

        document.querySelector('#mobile-menu')
        .style.transition='all 1s ease-out';
        document.querySelector('#mobile-menu')
        .style.display='flex';

        setTimeout(()=>{
        event.target.style.display='inline-block';

        document.querySelector('#mobile-menu')
        .style.display='none';
        }, '5000');

    });

    const aside = document.querySelector('aside')

    document.querySelector('.filter')
    .addEventListener('click', ()=>{
        if(aside.classList.contains('h-screen')){
            aside.classList.add('h-14');
            aside.classList.remove('h-screen');
            document.querySelector('.filter i')
            .style.rotate='0deg';
        } else{
            aside.classList.add('h-screen');
            aside.classList.remove('h-14');
            document.querySelector('.filter i')
            .style.rotate='180deg';
        }
    })
})