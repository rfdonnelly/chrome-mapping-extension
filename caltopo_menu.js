function open_in_google_maps(point) {
  point = GeoUtil.fromWGS84(point);
  zoom = org.sarsoft.MapState.views["Tools"].imap.map.getZoom();
  url = 'https://www.google.com/maps/@' + point[GeoUtil.LAT] + ',' + point[GeoUtil.LON] + ',' + zoom + 'z';
  window.open(url, "_blank");
}

function onload() {
  org.sarsoft.MapState.views["Tools"].imap.addContextMenuCallback(function (coordinates) {
    return [{text: "Open in Google Maps", handler: function (data) {open_in_google_maps(coordinates)}}];
  });
}

onload();
