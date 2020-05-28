import React from "react";
import ReactDOM from "react-dom";

import Map from "./map";
import "./app.scss";

import tstTracks from "./data/test/tracks.geojson";
import tstWaypoints from "./data/test/waypoints.geojson";
import tstUpdates from "./data/test/updates.geojson";

const App = (props) => {
  return (
    <Map tracks={tstTracks} waypoints={tstWaypoints} updates={tstUpdates} />
  );
};

ReactDOM.render(<App />, document.body);
