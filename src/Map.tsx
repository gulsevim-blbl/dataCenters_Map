import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "./map.css"
import dataCenters from "./data/data_centers.json";

interface DataCenterObject {
  id: string;
  Name: string;
  Latitude: number;
  Longitude: number;
}

interface DataCenters {
  [key: string]: DataCenterObject[];
}

const dataCentersTyped: DataCenters = dataCenters as DataCenters;

function App() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.keys(dataCentersTyped).map(provider => (
        dataCentersTyped[provider].map((datacenter: DataCenterObject) => (
          <Marker key={datacenter.id} position={[datacenter.Latitude, datacenter.Longitude]}>
            <Popup>
              {datacenter.Name}
            </Popup>
          </Marker>
        ))
      ))}
    </MapContainer>
  );
}

export default App;
