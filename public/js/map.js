// ✅ get coordinates from backend

// GeoJSON → Leaflet conversion
const lng = coordinates[0];
const lat = coordinates[1];

// ✅ dynamic map
let map = L.map('map').setView([lat, lng], 8);

L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ✅ dynamic marker
L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${listing.title}</b><br>${listing.location}`)
    .openPopup();
function onMapClick(e) {
      popup.setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);