function parse_google_maps_url(url) {
  return url
    .match(/@(?<lat>.*),(?<lng>.*),(?<z>\d+)z/)
    .groups;
}

function parse_caltopo_url(url) {
  return url
    .match(/ll=(?<lat>.*),(?<lng>.*)&z=(?<z>\d+)/)
    .groups;
}

function open_google_maps_in_caltopo(info) {
  groups = parse_google_maps_url(info.pageUrl)
  url = 'https://caltopo.com/map.html#ll=' + groups.lat + ',' + groups.lng + '&z=' + groups.z;
  chrome.tabs.create({
    url: url
  });
}

function open_google_maps_in_noaa(info) {
  groups = parse_google_maps_url(info.pageUrl)
  url = 'https://forecast.weather.gov/MapClick.php?lat=' + groups.lat + '&lon=' + groups.lng;
  chrome.tabs.create({
    url: url
  });
}

function open_caltopo_in_noaa(info) {
  groups = parse_caltopo_url(info.pageUrl)
  url = 'https://forecast.weather.gov/MapClick.php?lat=' + groups.lat + '&lon=' + groups.lng;
  chrome.tabs.create({
    url: url
  });
}

function create_context_menus() {
  chrome.contextMenus.create({
    title: 'Open Caltopo here',
    onclick: open_google_maps_in_caltopo,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Point forecast here',
    onclick: open_google_maps_in_noaa,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Point forecast here',
    onclick: open_caltopo_in_noaa,
    documentUrlPatterns: ['https://caltopo.com/*'],
    contexts: ["all"]
  });
}

chrome.runtime.onInstalled.addListener(function() {
  create_context_menus();
});
