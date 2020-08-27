// This script adds menu items to the Google Maps contextmenu.
//
// To add the menu items, we look for the existing menuitems
// using the 'li[data-index]' CSS selector. However, the
// menuitems do not exist until the initial display of the
// context menu.  So we listen for DOM updates to the menuitem
// list parent node.  This node receives some inital DOM updates
// that we need to ignore.  We filter the DOM updates by using a
// query select with the previously mentioned CSS selector.  If
// it returns nodes, then we add the menu items.

const extensionid = "lbabhpmjdampfhajpjkefkkocjokcedc";

function parse_google_maps_url(url) {
  return url
    .match(/@(?<lat>.*),(?<lon>.*),(?<zoom>\d+)z/)
    .groups;
}

function add_menuitems() {
  var nodes = document.querySelectorAll('li[data-index]');
  var reference = nodes[nodes.length - 1];

  var menuitems = [
    {id: 'caltopo', text: "Open in CalTopo"},
    {id: 'mountain_project', text: "Open in Mountain Project"},
    {id: 'noaa', text: "NOAA Forecast"}
  ];

  for (const menuitem of menuitems) {
    add_menuitem(reference, menuitem.text, function() {
      var view = parse_google_maps_url(window.location.href);
      chrome.runtime.sendMessage(extensionid, {
        id: menuitem.id,
        lat: view.lat,
        lon: view.lon,
        zoom: view.zoom
      });
    });
  }
}

function add_menuitem(reference, text, onclick) {
  var node = reference.cloneNode(true);
  node.attributes.removeNamedItem('data-index');
  node.attributes.removeNamedItem('jsaction');
  node.attributes.removeNamedItem('jsinstance');
  node.onclick = onclick;
  var text_node = node.querySelector('div.action-menu-entry-text');
  text_node.textContent = text;
  reference.parentNode.appendChild(node);
}

function on_menu_ready(callback) {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById('hovercard');

  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const observer_callback = function(mutationsList, observer) {
    var node = document.querySelector('li[data-index]');
    if (node) {
      callback();
      observer.disconnect();
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(observer_callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}

on_menu_ready(function() {
  add_menuitems();
});
