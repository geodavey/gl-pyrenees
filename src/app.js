import React from "react";
import ReactDOM from "react-dom";

import PyreneesMap from "./map";

ReactDOM.render(
  <PyreneesMap
    data={{
      tracks: {},
      updates: require("./data/test/gdv_updates.geojson"),
    }}
  />,
  document.getElementById("app")
);
