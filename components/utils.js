export default function getPosition(map, zoomOffset=0) {
  return {
    center: map.getCenter(),
    zoom: map.getZoom() + zoomOffset,
    bearing: map.getBearing(),
    pitch: map.getPitch()
  }
}

export default function getBounds(geometry) {
  let northeast = geometry.bounds.northeast
  let southwest = geometry.bounds.southwest
  let ne = new mapboxgl.LngLat(northeast.lng, northeast.lat)
  let sw = new mapboxgl.LngLat(southwest.lng, southwest.lat)

  return new mapboxgl.LngLatBounds(sw, ne)
}

export const torontoGeometry = {
  bounds: {
    northeast: {
      lat: 43.8554579,
      lng: -79.116897
    },
    southwest: {
      lat: 43.5810245,
      lng: -79.639219
    }
  },
  location: {
    lat: 43.653226,
    lng: -79.3831843
  },
  location_type: "APPROXIMATE",
  viewport: {
    northeast: {
      lat: 43.8554579,
      lng: -79.116897
    },
    southwest: {
      lat: 43.5810245,
      lng: -79.639219
    }
  }
}
