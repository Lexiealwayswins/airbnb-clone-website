"use client";

import L from "leaflet";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import Flag from "react-world-flags";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

type Props = {
  center?: number[];
  locationValue?: string;
};

// If center changes, map will update to new places
const MapUpdater = ({ center }: { center?: L.LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 5);
    }
  }, [center, map]);

  return null;
};

export const Map = ({ center, locationValue }: Props) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 6 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationValue ? (
        <>
          {center && (
            <Marker position={center as L.LatLngExpression}>
              <Popup>
                <div className="flex justify-center items-center animate-bounce">
                  <Flag code={locationValue} className="w-10" />
                </div>
              </Popup>
            </Marker>
          )}
        </>
      ) : (
        <>{center && <Marker position={center as L.LatLngExpression} />}</>
      )}
      <MapUpdater center={(center as L.LatLngExpression) || [51, -0.09]} />
    </MapContainer>
  );
};
