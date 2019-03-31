$(document).on('click', $('#menu-icon'), function(){
  let menu = $('#menu-icon');
  if(menu.attr('src')==="images/label/menu.png")
    menu.attr('src', "images/label/cross.png");
  else if(menu.attr('src')==="images/label/cross.png")
    menu.attr('src', "images/label/menu.png");
})
