import React from "react";

import GdvPin from "../style/gDv-pin.svg";
import { Marker } from "react-map-gl";

const gdvPinMarker = (props) => {
  let markerProps = {
    width: props.height / props.nativeRatio,
    height: props.height,
    offsetTop: -props.height,
    offsetLeft: -props.height / 2 / props.nativeRatio,
  };

  console.log(markerProps);
  return (
    <Marker
      key={props.key}
      longitude={props.longitude}
      latitude={props.latitude}
      {...markerProps}
    >
      <GdvPin height={markerProps.height} width={markerProps.width} />
    </Marker>
  );
};

gdvPinMarker.defaultProps = {
  height: 50,
  nativeRatio: 76 / 62,
};

export default gdvPinMarker;
