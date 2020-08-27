function parse_google_maps_url(url) {
  return url
    .match(/@(?<lat>.*),(?<lon>.*),(?<zoom>\d+)z/)
    .groups;
}

function parse_caltopo_url(url) {
  return url
    .match(/ll=(?<lat>.*),(?<lon>.*)&z=(?<zoom>\d+)/)
    .groups;
}

function open_google_maps_in_caltopo(info) {
  groups = parse_google_maps_url(info.pageUrl);
  url = 'https://caltopo.com/map.html#ll=' + groups.lat + ',' + groups.lon + '&z=' + groups.zoom;
  chrome.tabs.create({
    url: url
  });
}

function open_google_maps_in_noaa(info) {
  groups = parse_google_maps_url(info.pageUrl);
  url = 'https://forecast.weather.gov/MapClick.php?lat=' + groups.lat + '&lon=' + groups.lon;
  chrome.tabs.create({
    url: url
  });
}

function open_google_maps_in_mountain_project(info) {
  groups = parse_google_maps_url(info.pageUrl);
  url = 'https://www.mountainproject.com/map'
  chrome.tabs.create({
    url: url
  }, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'mountain_project_map_control.js'}, function() {
      chrome.tabs.sendMessage(tab.id, groups);
    });
  });
}

function open_google_maps(view) {
  url = 'https://www.google.com/maps/@' + view.lat + ',' + view.lon + ',' + view.zoom + 'z';
  chrome.tabs.create({
    url: url
  });
}

function open_mountain_project(view) {
  url = 'https://www.mountainproject.com/map'
  chrome.tabs.create({
    url: url
  }, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'mountain_project_map_control.js'}, function() {
      chrome.tabs.sendMessage(tab.id, view);
    });
  });
}

function create_context_menus() {
  // Google Maps
  chrome.contextMenus.create({
    title: 'Open in CalTopo',
    onclick: open_google_maps_in_caltopo,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Open in Mountain Project',
    onclick: open_google_maps_in_mountain_project,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    title: 'Point forecast',
    onclick: open_google_maps_in_noaa,
    documentUrlPatterns: ['https://www.google.com/maps/*'],
    contexts: ["all"]
  });
}

chrome.runtime.onInstalled.addListener(function() {
  create_context_menus();
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    switch (request.id) {
      case "google_maps":
        open_google_maps(request);
        break;
      case 'mountain_project':
        open_mountain_project(request);
        break;
    }
  });
