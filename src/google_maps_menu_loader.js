function onload() {
  var script = document.createElement('script');
  script.src = chrome.runtime.getURL('google_maps_menu.js');
  script.onload = function() {
    this.remove();
  };
  document.body.appendChild(script);
}

window.addEventListener("load", onload);
