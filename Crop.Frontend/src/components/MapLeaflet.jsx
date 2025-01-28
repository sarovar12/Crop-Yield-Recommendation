import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  ScaleControl,
  Circle,
  CircleMarker,
  Polyline,
  Polygon,
  Rectangle,
} from 'react-leaflet';
import Loading from '../components/Loading';
import GeoCoding from './GeoCoding';
import { ReverseGeoCoding } from './ReverseGeoCoding';

// const center = [51.505, -0.09];

// const polygon2 = [
//   [85.30967229911812, 27.732066805778018],
//   [85.30967229911812, 27.719569967078925],
//   [85.33763105057045, 27.719569967078925],
//   [85.33763105057045, 27.732066805778018],
//   [85.30967229911812, 27.732066805778018],
// ];

// const polyline = [
//   [51.505, -0.09],
//   [51.51, -0.1],
//   [51.51, -0.12],
// ];

// const multiPolyline = [
//   [
//     [51.5, -0.1],
//     [51.5, -0.12],
//     [51.52, -0.12],
//   ],
//   [
//     [51.5, -0.05],
//     [51.5, -0.06],
//     [51.52, -0.06],
//   ],
// ];

// const polygon = [
//   [51.515, -0.09],
//   [51.52, -0.1],
//   [51.52, -0.12],
// ];

// const multiPolygon = [
//   [
//     [51.51, -0.12],
//     [51.51, -0.13],
//     [51.53, -0.13],
//   ],
//   [
//     [51.51, -0.05],
//     [51.51, -0.07],
//     [51.53, -0.07],
//   ],
// ];

// const rectangle = [
//   [51.49, -0.08],
//   [51.5, -0.06],
// ];

// const fillBlueOptions = { fillColor: 'blue' };
// const blackOptions = { color: 'black' };
// const limeOptions = { color: 'lime' };
// const purpleOptions = { color: 'purple' };
// const redOptions = { color: 'red' };

const position = [51.505, -0.09];
function MapLeaflet() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const mapRef = useRef(null);

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

  console.log(markerPosition);
  console.log(loading);
  return loading ? (
    <Loading />
  ) : (
    <div className="w-3/10 h-2/4 mx-2 px-2">
      <MapContainer
        ref={mapRef}
        style={{ height: '100%', width: '100%', cursor: 'pointer' }}
        center={location}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 
        <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
        <CircleMarker
          center={[51.51, -0.12]}
          pathOptions={redOptions}
          radius={20}
        >
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker> */}
        {/* <Polyline pathOptions={limeOptions} positions={polyline} /> */}
        {/* <Polyline pathOptions={limeOptions} positions={multiPolyline} /> */}
        {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
        {/* <Polygon pathOptions={purpleOptions} positions={polygon2} /> */}
        {/* <Polygon pathOptions={purpleOptions} positions={multiPolygon} /> */}
        {/* <Rectangle bounds={polygon2} pathOptions={blackOptions} /> */}

        {/* <Marker draggable={true}  position={markerPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              
            </Popup>
          </Marker> */}

        <ReverseGeoCoding location={markerPosition} />
        <GeoCoding location={markerPosition} />

        <ScaleControl imperial={false} />
      </MapContainer>

      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default MapLeaflet;
