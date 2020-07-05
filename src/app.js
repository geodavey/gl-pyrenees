import React from "react";
import ReactDOM from "react-dom";

import PyreneesMap from "./map";

ReactDOM.render(
  <PyreneesMap
    zoom={8}
    data={{
      tracks: require("./data/test/gdv_tracks.geojson"),
      updates: require("./data/test/gdv_updates.geojson"),
    }}
  />,
  document.getElementById("app")
);
