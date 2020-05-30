import React, { useState, useEffect } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import gdvPin from "./style/gdvPin.png";

import HoverPopup from "./components/hoverPopup";
import SelectedPopup from "./components/selectedPopup";

import Loader from "./components/loader";

const Map = (props) => {
  let mapRef = React.createRef();

  // set initial viewport to be centered on last update
  let lastUpdate =
    props.data.updates.features[props.data.updates.features.length - 1];

  lastUpdate.properties.last = true;
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
        zoom: 14,
        viewportChangeMethod: "flyTo",
        viewportChangeOptions: {
          duration: 2000,
          padding: {
            top: 300,
          },
        },
      });
  }, [selectedFeature]);

  // Lazy load map-gl and style
  let [MapGL, setMapGL] = useState(null);
  let [mapStyle, setMapStyle] = useState(null);
  let [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    import(
      /* webpackChunkName: "MapGL" */ "@urbica/react-map-gl"
    ).then((MapGL) => setMapGL(MapGL));

    import(
      /* webpackChunkName: "mapStyle" */ "./style/style.json"
    ).then((mapStyle) => setMapStyle(mapStyle));
  }, []);

  // fire a fake loading event once style is loaded to trick map
  // into rendering local layers and controls immediately
  useEffect(() => {
    if (mapStyle && MapGL && mapRef.current) {
      mapRef.current.getMap().on("style.load", (e) => {
        e.target.fire("load", { fake: true });
      });
    }
  }, [mapStyle, MapGL]);

  let { data } = props;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!isMapLoaded && <Loader />}
      {MapGL && mapStyle && (
        <MapGL.default
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          onViewportChange={setViewport}
          mapStyle={mapStyle}
          onLoad={(e) => {
            if (e && !("fake" in e)) setIsMapLoaded(true);
          }}
          transformRequest={(url) => {
            if (url.indexOf("/") === -1) return; // fix webpack-dev-server

            let url_ = new URL(url);
            let loc = window.location;

            if (url.search("//localhost") != -1)
              return {
                url: `${loc.origin}${loc.pathname}${url_.pathname}`,
              };
          }}
          {...viewport}
        >
          <MapGL.Image id="gdvPin" image={gdvPin} />

          {/* Sources */}
          <MapGL.Source
            id="gdv_tracks"
            type="geojson"
            data={data.tracks}
          ></MapGL.Source>
          <MapGL.Source
            id="gdv_updates"
            type="geojson"
            data={data.updates}
          ></MapGL.Source>
          <MapGL.Source
            id="gdv_waypoints"
            type="geojson"
            data={data.waypoints}
          ></MapGL.Source>

          {/* Waypoints */}
          <MapGL.Layer
            id="gdv_waypoints"
            type="symbol"
            source="gdv_waypoints"
            before="gdv_waypoints-placeholder"
            layout={{
              "icon-image": "dot_11",
            }}
          />

          {/* Tracks */}
          <MapGL.Layer
            id="gdv_tracks-casing"
            type="line"
            source="gdv_tracks"
            before="gdv_tracks-placeholder"
            paint={{
              "line-color": "#fff",
              "line-width": 5,
            }}
          />
          <MapGL.Layer
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
          <MapGL.Layer
            id="gdv_updates"
            type="symbol"
            source="gdv_updates"
            layout={{
              "icon-image": "gdvPin",
              "icon-anchor": "bottom",
              "icon-size": ["case", ["==", ["get", "last"], true], 0.4, 0.2],
              "icon-allow-overlap": true,
            }}
          />

          {/* Refuges */}
          <MapGL.Layer
            id="pyr_refuges"
            type="symbol"
            source="pyr"
            source-layer="refuges"
            onClick={(r) => {
              setHoveredFeature(null);
              setSelectedFeature(r.features[0]);
            }}
            onHover={(r) => {
              let feat = r.features[0];

              if (
                selectedFeature &&
                feat.properties.id === selectedFeature.properties.id
              )
                return;

              setHoveredFeature(feat);
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
          {hoveredFeature && <HoverPopup feature={hoveredFeature} />}
          {selectedFeature && (
            <SelectedPopup
              feature={selectedFeature}
              onClose={() => setSelectedFeature(null)}
            />
          )}

          {/* Controls */}
          <MapGL.NavigationControl showZoom position="top-left" />
          <MapGL.FullscreenControl position="top-left" />
          <MapGL.ScaleControl
            maxWidth={100}
            unit="metric"
            position="bottom-left"
          />
        </MapGL.default>
      )}
    </div>
  );
};

export default Map;
