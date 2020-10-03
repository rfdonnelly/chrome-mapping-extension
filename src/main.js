function open_google_maps(view) {
  url = 'https://www.google.com/maps/@' + view.lat + ',' + view.lon + ',' + view.zoom + 'z';
  chrome.tabs.create({
    url: url
  });
}

function open_caltopo(view) {
  url = 'https://caltopo.com/map.html#ll=' + view.lat + ',' + view.lon + '&z=' + view.zoom;
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

function open_noaa(view) {
  url = 'https://forecast.weather.gov/MapClick.php?lat=' + view.lat + '&lon=' + view.lon;
  chrome.tabs.create({
    url: url
  });
}

function open_strava(view) {
  url = 'https://www.strava.com/heatmap#' + view.zoom + '/' + view.lon + '/' + view.lat + '/hot/all'
  chrome.tabs.create({
    url: url
  });
}

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    switch (request.id) {
      case "google_maps":
        open_google_maps(request);
        break;
      case 'mountain_project':
        open_mountain_project(request);
        break;
      case 'caltopo':
        open_caltopo(request);
        break;
      case 'noaa':
        open_noaa(request);
        break;
      case 'strava':
        open_strava(request);
        break;
    }
  });
