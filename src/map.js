import React, { useState, useEffect } from "react";
import MapGL, { GeolocateControl, Marker, Source, Layer } from "react-map-gl";

import mapStyle from "./style/style-dev.json";
import GdvPinMarker from "./components/gdvPinMarker";
import SpriteMarker from "./components/spriteMarker";

import "./map.scss";

const Map = (props) => {
  let [sprite, setSprite] = useState(null);
  let [viewport, setViewport] = useState({
    longitude: 0.5572895,
    latitude: 42.6993485,
    zoom: 7,
  });

  let mapRef = React.createRef();

  //
  // Grab sprites from style once loaded
  //

  useEffect(() => {
    let map = mapRef.current.getMap();

    let setSpriteWhenLoaded = (e) => {
      if (e.style.imageManager.loaded) {
        setSprite(e.style.imageManager.images);
        map.off("styledata", this);
      }
    };

    map.on("styledata", setSpriteWhenLoaded);
  }, []);

  return (
    <MapGL
      {...viewport}
      ref={mapRef}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      mapStyle={mapStyle}
    >

      {/* Waypoints Markers */}
      {props.waypoints.features.map((wpt, idx) => {
        return (
          <SpriteMarker
            key={idx}
            longitude={wpt.geometry.coordinates[0]}
            latitude={wpt.geometry.coordinates[1]}
            sprite={sprite}
            height={11}
            width={11}
            icon="dot_11"
          />
        );
      })}

      {/* Updates Markers */}
      {props.updates.features.map((upd, idx) => {
        let pinHeight = idx !== props.updates.features.length - 1 ? 30 : 50;

        return (
          <GdvPinMarker
            key={idx}
            longitude={upd.geometry.coordinates[0]}
            latitude={upd.geometry.coordinates[1]}
            height={pinHeight}
          />
        );
      })}

      {/* Tracks  */}
      <Source id="gdv_tracks" type="geojson" data={props.tracks}>
        <Layer
          id="gdv_tracks"
          beforeId="gdv_tracks-placeholder"
          type="line"
          paint={{
            "line-color": "#4b4b4b",
            "line-width": 2,
          }}
        />
      </Source>

      {/* Controls */}
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
    </MapGL>
  );
};

export default Map;
