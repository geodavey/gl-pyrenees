import React from "react";
import ReactDOM from "react-dom";

import Map from "./map";
import "./app.scss";

let data = {
  tracks: require("./data/test/tracks.geojson"),
  waypoints: require("./data/test/waypoints.geojson"),
  updates: require("./data/test/updates.geojson"),
  refuges: require("./data/pyr_refuges.geojson")
}

const App = (props) => {
  return (
    <Map data={data} />
  );
};

ReactDOM.render(<App />, document.body);
