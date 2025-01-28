import L from 'leaflet';
import { useMap } from 'react-leaflet';
import axios from 'axios';
import { useEffect } from 'react';

export function ReverseGeoCoding({ location, setMarkerPosition, markerRef }) {
  const map = useMap();

  useEffect(() => {
    console.log(location);

    // Check if location is undefined or empty
    if (!location || (Array.isArray(location) && location.length === 0)) {
      return; // Avoid running if location is undefined or empty
    }

    // If location is an array, use the values as lat and lng
    const latLng = Array.isArray(location)
      ? { lat: location[0], lng: location[1] }
      : location;

    const fetchLocationName = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLng.lat}&lon=${latLng.lng}`
        );

        const name = response.data.display_name;

        if (!markerRef.current) {
          // Create marker if it doesn't exist
          markerRef.current = L.marker([latLng.lat, latLng.lng], {
            draggable: true,
          })
            .addTo(map)
            .bindPopup(`Location: ${name}`)
            .openPopup();

          markerRef.current.on('dragend', (e) => {
            const { lat, lng } = e.target.getLatLng();
            setMarkerPosition([lat, lng]); // Ensure lat and lng are passed as an array
          });
        } else {
          // Update existing marker
          markerRef.current.setLatLng([latLng.lat, latLng.lng]);
          markerRef.current.bindPopup(`Location: ${name}`).openPopup();
        }
      } catch (error) {
        console.error('Error fetching location name:', error);
      }
    };

    fetchLocationName();
  }, [location, map, setMarkerPosition, markerRef]);

  return null;
}
