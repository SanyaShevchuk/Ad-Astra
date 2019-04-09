//
// $(document).on('click', $('#menu-icon'), function(){
//   let menu = $('#menu-icon');
//   if(menu.attr('src')==="/images/label/menu.png")
//     menu.attr('src', "/images/label/cross.png");
//   else if(menu.attr('src')==="/images/label/cross.png")
//     menu.attr('src', "/images/label/menu.png");
//
//
//
//   $('#menu-icon').toggle('toggle');
// })

$(document).ready(function(){
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  const menu = document.getElementById('nav-bar-collapse-1');

  burger.addEventListener('click', ()=>{
    burger.classList.toggle('toggle');

    nav.classList.toggle('nav-active');




    if($('#nav-bar-collapse-1').is(":visible")){
      $('#nav-bar-collapse-1').hide(1000);
      menu.style.display = "none";
    } else {
      $('#nav-bar-collapse-1').show(1000);
    }

    navLinks.forEach((link, index)=>{
      if(link.style.animation){
        link.style.animation = "";
      } else{
        // $('#nav-bar-collapse-1').show(1500);
        link.style.animation = `navLinkFade 0.5s ease forwards ${index/12 + 0.1}s`;
      }
    })
  })
});
