import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import Leaflet from 'leaflet';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

export default function LeafletControlGeocoder() {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    const geocoder = Leaflet.Control.Geocoder.nominatim();

    Leaflet.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
      geocoder,
    })
      .on('markgeocode', function (e) {
        const { center } = e.geocode;

        if (!markerRef.current) {
          // Create a new marker if it doesn't exist
          markerRef.current = Leaflet.marker(center, { draggable: true })
            .addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();

          markerRef.current.on('dragend', (event) => {
            const { lat, lng } = event.target.getLatLng();
            console.log('Marker dragged to:', lat, lng);
          });
        } else {
          // Update the existing marker
          markerRef.current.setLatLng(center);
          markerRef.current.bindPopup(e.geocode.name).openPopup();
        }

        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);

  return null;
}
