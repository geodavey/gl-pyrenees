import React, { useState, useEffect } from "react";
import MapGL, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  Image,
} from "@urbica/react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import mapStyle from "./style/style.json";
import gdvPin from "./style/gdvPin.png";
import Popup from "./components/popup";

const Map = (props) => {
  let mapRef = React.createRef();

  // set initial viewport to be centered on last update
  let lastUpdate =
    props.data.updates.features[props.data.updates.features.length - 1];
  let [viewport, setViewport] = useState({
    longitude: lastUpdate.geometry.coordinates[0],
    latitude: lastUpdate.geometry.coordinates[1],
    zoom: 10,
  });

  // setup for popup
  let [selectedFeature, setSelectedFeature] = useState(null);
  let [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    if (selectedFeature)
      setViewport({
        longitude: selectedFeature.geometry.coordinates[0],
        latitude: selectedFeature.geometry.coordinates[1],
        zoom: 13,
        viewportChangeOptions: {
          duration: 2000,
          padding: {
            top: 400,
          },
        },
      });
  }, [selectedFeature]);

  // for some reason have got to fire a fake loading s
  useEffect(() => {
    mapRef.current.getMap().fire("load", { fake: true });
  }, []);

  let { data } = props;

  return (
    <MapGL
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      onViewportChange={setViewport}
      viewportChangeMethod={"flyTo"}
      viewportChangeOptions={{ duration: 2000 }}
      mapStyle={mapStyle}
      onLoad={(e) => {
        if (e && !"fake" in e) props.onLoad(e);
      }}
      {...viewport}
    >
      <Image id="gdvPin" image={gdvPin} />

      {/* Sources */}
      <Source id="gdv_tracks" type="geojson" data={data.tracks}></Source>
      <Source id="gdv_updates" type="geojson" data={data.updates}></Source>
      <Source id="gdv_waypoints" type="geojson" data={data.waypoints}></Source>

      {/* Waypoints */}
      <Layer
        id="gdv_waypoints"
        type="symbol"
        source="gdv_waypoints"
        before="gdv_waypoints-placeholder"
        layout={{
          "icon-image": "dot_11",
        }}
      />

      {/* Tracks */}
      <Layer
        id="gdv_tracks-casing"
        type="line"
        source="gdv_tracks"
        before="gdv_tracks-placeholder"
        paint={{
          "line-color": "#fff",
          "line-width": 5,
        }}
      />
      <Layer
        id="gdv_tracks"
        type="line"
        source="gdv_tracks"
        before="gdv_tracks-placeholder"
        paint={{
          "line-color": "#d37aff",
          "line-width": 2,
        }}
      />

      {/* Updates */}
      <Layer
        id="gdv_updates"
        type="symbol"
        source="gdv_updates"
        layout={{
          "icon-image": "gdvPin",
          "icon-anchor": "bottom",
          "icon-size": 0.2,
          "icon-allow-overlap": true,
        }}
      />

      {/* Refuges */}
      <Layer
        id="pyr_refuges"
        type="symbol"
        source="pyr"
        source-layer="refuges"
        onClick={(r) => {
          console.log("onClick", r);
          setHoveredFeature(null);
          setSelectedFeature(r.features[0]);
        }}
        onHover={(r) => {
          setHoveredFeature(r.features[0]);
          r.target.getCanvas().style.setProperty("cursor", "pointer");
        }}
        onLeave={(r) => {
          setHoveredFeature(null);
          r.target.getCanvas().style.removeProperty("cursor");
        }}
        layout={{
          "icon-image": {
            stops: [
              [0, ""],
              [10, "shelter_11"],
            ],
          },
          "icon-size": {
            stops: [
              [10, 0.5],
              [12, 1],
            ],
          },
        }}
      />

      {/* Popup */}
      {hoveredFeature && <Popup feature={hoveredFeature} />}

      {/* Controls */}
      <NavigationControl showCompass showZoom position="top-left" />
      <FullscreenControl position="top-left" />
      <ScaleControl maxWidth={100} unit="metric" position="bottom-left" />
    </MapGL>
  );
};

export default Map;
