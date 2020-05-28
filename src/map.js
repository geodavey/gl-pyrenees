import React, { useState, useEffect } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";

import mapStyle from "./style/style-dev.json";

import tstGeojson from "./data/peaks3000.geojson";
import GdvPin from "./style/gDv-pin.svg";

const Map = (props) => {
  let [viewport, setViewport] = useState({
    longitude: 0.5572895,
    latitude: 42.6993485,
    zoom: 7,
  });

  let gdvPinHeight = 50;
  let gdvPinRatio = 76 / 62;

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      mapStyle={mapStyle}
    >
      {tstGeojson.features.map((tst, idx) => {
        // markers for previous waypoints
        if (idx !== tstGeojson.features.length - 1) {
          return;
        } else {
          // marker for current waypoint
          console.log(tst);
          return (
            <Marker
              key={idx}
              longitude={tst.geometry.coordinates[0]}
              latitude={tst.geometry.coordinates[1]}
              offsetTop={-gdvPinHeight}
              height={gdvPinHeight}
              width={gdvPinHeight / gdvPinRatio}
            >
              <GdvPin
                height={gdvPinHeight}
                width={gdvPinHeight / gdvPinRatio}
              />
            </Marker>
          );
        }
      })}
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
    </MapGL>
  );
};

export default Map;
