import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import Leaflet from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function GeoCoding({ setMarkerPosition, markerRef }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = Leaflet.Control.Geocoder.nominatim();

    Leaflet.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
      geocoder,
    })
      .on('markgeocode', function (e) {
        const { center, name } = e.geocode;

        if (!markerRef.current) {
          // Create marker if it doesn't exist
          markerRef.current = Leaflet.marker(center, { draggable: true })
            .addTo(map)
            .bindPopup(name)
            .openPopup();

          markerRef.current.on('dragend', (event) => {
            const { lat, lng } = event.target.getLatLng();
            setMarkerPosition([lat, lng]);
          });
        } else {
          // Update existing marker
          markerRef.current.setLatLng(center);
          markerRef.current.bindPopup(name).openPopup();
        }

        map.fitBounds(e.geocode.bbox);
        setMarkerPosition(center); // Update marker position
      })
      .addTo(map);
  }, [map, setMarkerPosition, markerRef]);

  return null;
}
