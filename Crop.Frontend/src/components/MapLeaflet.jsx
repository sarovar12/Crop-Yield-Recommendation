import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, ScaleControl } from 'react-leaflet';
import Loading from '../components/Loading';
import GeoCoding from './GeoCoding';
import { ReverseGeoCoding } from './ReverseGeoCoding';

const position = [51.505, -0.09];

function MapLeaflet({ onMarkerPositionChange }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const markerRef = useRef(null); // Shared marker reference
  const mapRef = useRef(null);

  useEffect(() => {
    onMarkerPositionChange(markerPosition);
  }, [markerPosition, onMarkerPositionChange]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        setLocation([
          geoPosition.coords.latitude,
          geoPosition.coords.longitude,
        ]);
        setMarkerPosition([
          geoPosition.coords.latitude,
          geoPosition.coords.longitude,
        ]);
        setLoading(false);
      },
      (geoError) => {
        setError(geoError.message);
        setLocation(position);
        setLoading(false);
      }
    );
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="w-3/10 h-2/4 mx-2 px-2">
      <MapContainer
        ref={mapRef}
        style={{ height: '100%', width: '100%', cursor: 'pointer' }}
        center={location || markerPosition} // Fallback to markerPosition if location is null
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Only render ReverseGeoCoding when location/markerPosition is available */}
        {markerPosition && (
          <ReverseGeoCoding
            location={markerPosition}
            setMarkerPosition={setMarkerPosition}
            markerRef={markerRef}
          />
        )}
        <GeoCoding
          setMarkerPosition={setMarkerPosition}
          markerRef={markerRef}
        />

        <ScaleControl imperial={false} />
      </MapContainer>

      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default MapLeaflet;
