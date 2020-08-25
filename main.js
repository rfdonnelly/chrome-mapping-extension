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
  groups = parse_google_maps_url(info.pageUrl);
  url = 'https://caltopo.com/map.html#ll=' + groups.lat + ',' + groups.lng + '&z=' + groups.z;
  chrome.tabs.create({
    url: url
  });
}

function open_google_maps_in_noaa(info) {
  groups = parse_google_maps_url(info.pageUrl);
  url = 'https://forecast.weather.gov/MapClick.php?lat=' + groups.lat + '&lon=' + groups.lng;
  chrome.tabs.create({
    url: url
  });
}

function open_caltopo_in_noaa(info) {
  groups = parse_caltopo_url(info.pageUrl);
  url = 'https://forecast.weather.gov/MapClick.php?lat=' + groups.lat + '&lon=' + groups.lng;
  chrome.tabs.create({
    url: url
  });
}

function open_caltopo_in_google_maps(info) {
  groups = parse_caltopo_url(info.pageUrl);
  url = 'https://www.google.com/maps/@' + groups.lat + ',' + groups.lng + ',' + groups.z + 'z';
  chrome.tabs.create({
    url: url
  });
}

function create_context_menus() {
  chrome.contextMenus.create({
    title: 'Open in CalTopo',
    onclick: open_google_maps_in_caltopo,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Point forecast',
    onclick: open_google_maps_in_noaa,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Point forecast',
    onclick: open_caltopo_in_noaa,
    documentUrlPatterns: ['https://caltopo.com/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Open in Google Maps',
    onclick: open_caltopo_in_google_maps,
    documentUrlPatterns: ['https://caltopo.com/*'],
    contexts: ["all"]
  });
}

chrome.runtime.onInstalled.addListener(function() {
  create_context_menus();
});
