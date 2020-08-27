var message;

function onload() {
  var script = document.createElement('script');
  script.textContent = `
    window.APMap.jumpTo({
      center: [${message.lon}, ${message.lat}],
      zoom: ${message.zoom},
    });
  `
  document.body.appendChild(script);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    message = request;
  }
);

window.addEventListener("load", onload);
