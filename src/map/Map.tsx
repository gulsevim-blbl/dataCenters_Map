import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import "./map.css";
import dataCenters from "../data/data_centers.json"

interface DataCenterObject {
  id: string;
  Name: string;
  Latitude: number;
  Longitude: number;
  Provider: string; // Sağlayıcı bilgisini saklamak için
}

interface DataCenters {
  [key: string]: DataCenterObject[];
}

const dataCentersTyped: DataCenters = dataCenters as DataCenters;

function Map() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const azureMarkerIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/color/48/azure-1.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  const awsMarkerIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/color/48/amazon-web-services.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  const googleMarkerIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/color/48/google-cloud.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div>
      <div className="buttons">
        <button className="icon-button azure" onClick={() => setSelectedProvider('Azure')}>Azure</button>
        <button className="icon-button aws" onClick={() => setSelectedProvider('AWS')}>AWS</button>
        <button className="icon-button gcp" onClick={() => setSelectedProvider('GCP')}>GCP</button>
        <button className="icon-button all" onClick={() => setSelectedProvider(null)}>All</button>
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.keys(dataCentersTyped).map(provider =>
          dataCentersTyped[provider]
            .filter(datacenter => !selectedProvider || datacenter.Provider === selectedProvider)
            .map((datacenter: DataCenterObject) => (
              <Marker
                key={datacenter.id}
                position={[datacenter.Latitude, datacenter.Longitude]}
                icon={
                  datacenter.Provider === 'Azure'
                    ? azureMarkerIcon
                    : datacenter.Provider === 'AWS'
                    ? awsMarkerIcon
                    : datacenter.Provider === 'GCP'
                    ? googleMarkerIcon
                    : googleMarkerIcon
                }
              >
                <Popup>{datacenter.Name}</Popup>
              </Marker>
            ))
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
