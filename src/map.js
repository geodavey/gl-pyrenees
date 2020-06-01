import React, { useState, useEffect } from "react";
import Popup from "./components/popup";
import Loader from "./components/loader";
import gdvPin from "./style/gdvPin.png";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss";

const Map = (props) => {
  let mapRef = React.createRef();

  //
  // Viewport
  //

  // set initial view to be last update
  let lastUpdate =
    props.data.updates.features[props.data.updates.features.length - 1];
  let [viewport, setViewport] = useState({
    longitude: lastUpdate.geometry.coordinates[0],
    latitude: lastUpdate.geometry.coordinates[1],
    zoom: 10,
  });

  //
  // Popup interaction
  //

  let [selectedFeature, setSelectedFeature] = useState(null);
  let [hoveredFeature, setHoveredFeature] = useState(null);

  // fly to feature once selected
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

  //
  // Lazy load map-gl and style
  //

  let [MapGL, setMapGL] = useState(null);
  let [mapStyle, setMapStyle] = useState(null);

  useEffect(() => {
    import(
      /* webpackChunkName: "MapGL" */ "@urbica/react-map-gl"
    ).then((MapGL) => setMapGL(MapGL));

    import(
      /* webpackChunkName: "mapStyle" */ "./style/style.json"
    ).then((mapStyle) => setMapStyle(mapStyle));
  }, []);

  //
  // Swap layer sources & Set-up Interactivity
  //

  let [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (mapStyle && MapGL && mapRef.current) {
      let map = mapRef.current.getMap();

      // add icons
      // [iconName, iconURL]
      let icons = [["gdvPin", gdvPin]];
      icons.forEach((ic) => {
        map.loadImage(ic[1], (err, data) => {
          map.addImage(ic[0], data);
        });
      });

      // add click & hover handlers for popup layers
      let popupLayers = ["pyr_refuges", "gdv_updates"];
      popupLayers.forEach((lyr) => {
        map.on("click", lyr, (e) => {
          setHoveredFeature(null);
          setSelectedFeature(e.features[0]);
        });

        map.on("mousemove", lyr, (e) => {
          let feat = e.features[0];

          if (
            selectedFeature &&
            feat.properties.id !== selectedFeature.properties.id
          )
            setHoveredFeature(feat);

          map.getCanvas().style.setProperty("cursor", "pointer");
        });

        map.on("mouseleave", lyr, (e) => {
          setHoveredFeature(null);
          map.getCanvas().style.removeProperty("cursor");
        });
      });

      map.on("style.load", (e) => {
        // replace test source data with real data
        map.getSource("gdv_tracks").setData(data.tracks);
        map.getSource("gdv_updates").setData(data.updates);
        map.getSource("gdv_waypoints").setData(data.waypoints);

        // fire a fake loading event to trick map to render controls immediately
        // set map loaded on idle (once all rendering stops)
        map.fire("load", { fake: true });
        map.on("load", (e) => {
          if (e)
            map.once("idle", (e) => {
              setIsMapLoaded(true);
            });
        });
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
          attributionControl={false}
          onViewportChange={setViewport}
          mapStyle={mapStyle}
          transformRequest={(url) => {
            // rewrite references from style

            let url_ = new URL(url);
            let loc = window.location;

            if (url.search("//localhost") != -1)
              return {
                url: `${loc.origin}${loc.pathname}${url_.pathname}`,
              };
          }}
          {...viewport}
        >
          {/* Popup */}
          {hoveredFeature && <Popup feature={hoveredFeature} type="hover" />}
          {selectedFeature && (
            <Popup
              feature={selectedFeature}
              type="detail"
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
          <MapGL.AttributionControl
            compact={true}
            position="bottom-right"
            customAttribution="<a style='display:block;text-align:center;font-size:20px;margin:0.3em 0 0.3em 0.8em;border-bottom:1px solid #ccc' href='https://github.com/1papaya/gl-pyrenees'>¡ Viva La Open Source !</a>"
          />
          <MapGL.GeolocateControl position="top-left" />
        </MapGL.default>
      )}
    </div>
  );
};

export default Map;
