function onload() {
  var script = document.createElement('script');
  script.src = chrome.runtime.getURL('caltopo_menu.js');
  // script.onload = function() {
  //   this.remove();
  // };
  document.body.appendChild(script);
}

window.addEventListener("load", onload);
