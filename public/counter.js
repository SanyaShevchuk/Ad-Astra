let storage = window.localstorage;

$(document).ready(addVisitor);

function addVisitor(){
  let page = $('.article-title-photo img').attr('src').split('/')[1] +
      $('.article-title-photo img').attr('src').split('/')[2].split('.')[0];
  let counter = localStorage.getItem(page);
  if(counter) {
    counter++;
  } else {
    counter = 1;
  }
  localStorage.setItem(page, counter);
  $('#localvisitor').text("Visitors : " +counter);
}


// incrementAndShowValue();
//
// function incrementAndShowValue() {
//   var type = $('.article-title-photo img').attr('src').split('/')[1];
//   var id = $('.article-title-photo img').attr('src').split('/')[2].split('.')[0];
//   var cookiepage = "visitcounter_"+type+"_"+id;
//   var value = getCookie(cookiepage) || 0;
//   alert(cookiepage);
//   var newValue = ("00000" + (Number(value) + 1)).slice(-6);
//   var container = document.getElementById("counterVisitor");
//   String(newValue).split("").forEach(function(item, index) {
//     container.children[index].innerHTML = item;
//   });
//   let counter = Number(value) + 1;
//   setCookie(cookiepage, counter);
// }
//
// function setCookie(name, value, days) {
//   var expires = "";
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + value + expires + "; path=https://stacksnippets.net/js";
// }
//
// function getCookie(name) {
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }