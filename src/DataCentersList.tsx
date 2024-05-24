import React from 'react';
import data from './data/data_centers.json';
import "./datacenterslist.css";

// DataCenter arayüzü
interface DataCenter {
  id: string;
  Name: string;
  Latitude: number;
  Longitude: number;
  Provider: string;
}

const DataCentersList = () => {
  return (
    <div className="data-center-list">
        <h6>Summary by region</h6>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((providerKey) => {
            const provider = providerKey as keyof typeof data;
            return data[provider].map((center: DataCenter) => (
              <tr key={center.id}>
                <td>{center.Name}</td>
                <td>{center.Latitude}</td>
                <td>{center.Longitude}</td>
                <td>{center.Provider}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataCentersList;
