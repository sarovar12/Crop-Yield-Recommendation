import L from 'leaflet';
import { useMap } from 'react-leaflet';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export function ReverseGeoCoding({ location }) {
  const [locationName, setLocationName] = useState('');
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    const fetchLocationName = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location[0]}&lon=${location[1]}`
        );
        const name = response.data.display_name;
        setLocationName(name);

        if (!markerRef.current) {
          // Create a new marker if it doesn't exist
          markerRef.current = L.marker(location, { draggable: true })
            .addTo(map)
            .bindPopup(`Location: ${name}`)
            .openPopup();

          markerRef.current.on('dragend', handleMarkerDragEnd);
        } else {
          // Update the existing marker
          markerRef.current.setLatLng(location);
          markerRef.current.bindPopup(`Location: ${name}`).openPopup();
        }
      } catch (error) {
        console.error('Error fetching location name:', error);
      }
    };

    fetchLocationName();
  }, [location, map]);

  const handleMarkerDragEnd = async (e) => {
    const newLatLng = e.target.getLatLng();
    const { lat, lng } = newLatLng;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const newName = response.data.display_name;

      setLocationName(newName);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
        markerRef.current.bindPopup(`Location: ${newName}`).openPopup();
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return null;
}
