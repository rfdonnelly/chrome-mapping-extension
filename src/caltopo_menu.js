const extensionid = "maeojijfkkhoinnffgfobihlgfcllfoj";

function open(id, point) {
  point = GeoUtil.fromWGS84(point);
  zoom = org.sarsoft.MapState.views["Tools"].imap.map.getZoom();
  chrome.runtime.sendMessage(extensionid, {
    id: id,
    lat: point[GeoUtil.LAT],
    lon: point[GeoUtil.LON],
    zoom: zoom
  });
}

function onload() {
  org.sarsoft.MapState.views["Tools"].imap.addContextMenuCallback(function (coordinates) {
    return [
      {text: "Open in Google Maps", handler: function (data) {open('google_maps', coordinates)}},
      {text: "Open in Mountain Project", handler: function (data) {open('mountain_project', coordinates)}}
    ];
  });
}

onload();
