import React, { useState, useEffect } from "react";
import MapGL, { WebMercatorViewport } from "react-map-gl";

import mapStyle from "./style/style-dev.json";

const Map = (props) => {
  let [viewport, setViewport] = useState({
    longitude: 0.5572895,
    latitude: 42.6993485,
    zoom: 7,
  });

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      mapStyle={mapStyle}
    />
  );
};

Map.defaultProps = {
};

export default Map;
