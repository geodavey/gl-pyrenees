import React from "react";
import ReactDOM from "react-dom";

import Map from "./map";
import "./app.scss";

const App = (props) => {
  return (
    <Map />
  );
};

ReactDOM.render(<App />, document.body);