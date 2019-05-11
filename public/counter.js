incrementAndShowValue();

function incrementAndShowValue() {
  var value = getCookie("visitcounter") || 0;
  var newValue = ("00000" + (Number(value) + 1)).slice(-6);
  var container = document.getElementById("counterVisitor");
  String(newValue).split("").forEach(function(item, index) {
    container.children[index].innerHTML = item;
  });
  counter++;
  setCookie("visitcounter", counter);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=https://stacksnippets.net/js";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}