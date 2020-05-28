import React, { useState, useEffect } from "react";

import { Marker } from "react-map-gl";

const spriteMarker = (props) => {
  let canvasRef = React.createRef();
  let [markerOffset, setMarkerOffset] = useState({
    offsetTop: 0,
    offsetLeft: 0,
  });

  useEffect(() => {
    // once sprite is loaded and it contains the icon...
    if (props.sprite && props.icon in props.sprite) {
      let icon = props.sprite[props.icon];
      let { data: iconData, height, width } = icon.data;
      let imgData = new ImageData(
        Uint8ClampedArray.from(iconData),
        height,
        width
      );
      console.log(imgData);

      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");

      canvas.height = height;
      canvas.width = width;

      canvas.style.setProperty("height", `${props.height}px`);
      canvas.style.setProperty("width", `${props.width}px`);

      ctx.putImageData(imgData, 0, 0);
      setMarkerOffset({
        offsetTop: -props.height/2,
        offsetLeft: -props.width/2
      })
    }
  }, [props.sprite]);

  return (
    <Marker
      {...markerOffset}
      width={props.width}
      height={props.height}
      longitude={props.longitude}
      latitude={props.latitude}
      className="mapboxgl-marker-centered"
    >
      <canvas ref={canvasRef}></canvas>
    </Marker>
  );
};

spriteMarker.defaultProps = {};

export default spriteMarker;
