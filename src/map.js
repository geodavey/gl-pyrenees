import React, { useState, useEffect, forwardRef } from "react";
import Popup, { popupHeights } from "./components/popup";
import Infobox from "./components/infobox";
import isMobile from "is-mobile";

import gdvPin from "./img/gdvPin.png";
import "fontsource-barlow-condensed/latin-400-normal.css";
import "fontsource-palanquin/latin-400-normal.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss";

const Map = forwardRef((props, ref) => {
  let mapRef = ref || React.createRef();

  //
  // Viewport
  //

  // set initial view to be last update location
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
        zoom: viewport.zoom + 0.000001,
        viewportChangeMethod: "flyTo",
        viewportChangeOptions: {
          duration: 2000,
          padding: {
            top: popupHeights[selectedFeature.layer.id],
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
      /* webpackChunkName: "mapGL" */ "@urbica/react-map-gl"
    ).then((MapGL) => setMapGL(MapGL));

    import(/* webpackChunkName: "mapStyle" */ "./style.json").then(
      (mapStyle) => {
        // intercept map style and replace sources with passed data

        [
          ["gdv_tracks", data.tracks],
          ["gdv_updates", data.updates],
        ].forEach((src) => {
          mapStyle.sources[src[0]] = {
            type: "geojson",
            data: src[1],
          };
        });

        setMapStyle(mapStyle);
      }
    );
  }, []);

  //
  // Swap layer Sources & Set-up Interactivity
  //

  let [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (mapStyle && MapGL && mapRef.current) {
      let map = mapRef.current.getMap();

      map.once("load", (e) => {
        setIsMapLoaded(true);
      });

      // add custom icons [iconName, iconURL]
      let icons = [["gdvPin", gdvPin]];
      icons.forEach((ic) => {
        map.loadImage(ic[1], (err, data) => {
          map.addImage(ic[0], data);
        });
      });

      // initialize with latest update featured
      setSelectedFeature({
        ...lastUpdate,
        layer: { id: "gdv_updates" },
      });

      // Popup Layers
      let popupLayers = ["pyr_refuges", "pyr_resupply", "gdv_updates"];

      popupLayers.forEach((lyr) => {
        map.on("click", lyr, (e) => {
          setHoveredFeature(null);
          // this fires before <Popup onClose={}> sometimes which is problematic
          // give it a lil' delay, won't hurt no body
          // ......right??
          setTimeout(setSelectedFeature, 100, e.features[0]);
        });
      });

      // Hover Layers
      let hoverLayers = ["pyr_refuges", "gdv_updates"];

      // only set hover layers on non-mobile
      if (!isMobile())
        hoverLayers.forEach((lyr) => {
          map.on("mousemove", lyr, (e) => {
            setHoveredFeature(e.features[0]);
          });

          map.on("mouseleave", lyr, (e) => {
            setHoveredFeature(null);
          });
        });

      // Set cursor to pointer on popup & hover layers
      let cursorLayers = [...popupLayers, ...hoverLayers];

      cursorLayers.forEach((lyr) => {
        map.on("mousemove", lyr, (e) => {
          map.getCanvas().style.setProperty("cursor", "pointer");
        });

        map.on("mouseleave", lyr, (e) => {
          map.getCanvas().style.removeProperty("cursor");
        });
      });
    }
  }, [mapStyle, MapGL]);

  let { data } = props;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {MapGL && mapStyle && (
        <MapGL.default
          {...viewport}
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
          refreshExpiredTiles={false}
          onViewportChange={setViewport}
          mapStyle={mapStyle}
          onLoad={(e) => {
            if (typeof e !== "undefined" && !("fake" in e)) props.onLoad(e);
          }}
          transformRequest={(url) => {
            // modify data urls if the map is not hosted locally (development)

            let dataURL = new URL(url);
            let pageLoc = `${window.location.origin}${window.location.pathname}`;

            // if data URL is a localhost
            if (url.search("//localhost") >= 0) {
              // if current page has localhost in it, it's a dev server, no modify
              if (pageLoc.search("//localhost") >= 0) return;

              // if current page is not localhost, gonna have to rewrite
              if (pageLoc.search("//localhost") < 0)
                if (props.baseDataURL)
                  return { url: `${props.baseDataURL}${dataURL.pathname}` };
                else return { url: `${pageLoc}${dataURL.pathname}` };
            }
          }}
        >
          {/* Popup */}
          {hoveredFeature &&
            (!selectedFeature ||
              selectedFeature.properties.id !==
                hoveredFeature.properties.id) && (
              <Popup
                feature={hoveredFeature}
                closeButton={false}
                type="hover"
                onClose={() => setHoveredFeature(null)}
              />
            )}
          }}
          {selectedFeature && (
            <Popup
              feature={selectedFeature}
              type="detail"
              closeOnClick={true}
              onClose={() => setSelectedFeature(null)}
            />
          )}
          {/* Infobox */}
          <Infobox isOpen={false} />
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
            customAttribution="<a style='display:block;text-align:center;font-size:20px;margin:0.3em 0 0.3em 0.8em;border-bottom:1px solid #ccc' href='https://github.com/geoDavey/gl-pyrenees'>¡ Viva La Open Source !</a>"
          />
          <MapGL.GeolocateControl
            position="top-left"
            trackUserLocation={true}
            onError={() => {
              window.alert(
                "Error! Geolocate not working. Maybe check your browser permissions?"
              );
            }}
          />
        </MapGL.default>
      )}
    </div>
  );
});

Map.defaultProps = {
  data: {
    updates: [],
    tracks: [],
  },
  baseDataURL: null,
  onLoad: () => {},
};

export default Map;
