import React from "react";
import ReactDOM from "react-dom";

import Map from "./map";

// data in public folder to be accessible to Maputnik served
// by webpack-dev-server

let data = {
  tracks: require("./data/test/gdv_tracks.geojson"),
  updates: require("./data/test/gdv_updates.geojson"),
};

ReactDOM.render(<Map data={data} />, document.getElementById("app"));
