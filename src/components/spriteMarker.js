import React, { useState, useEffect } from "react";

import { Marker } from "react-map-gl";

const spriteMarker = (props) => {
  let canvasRef = React.createRef();

  useEffect(() => {
    // once sprite is loaded and it contains the icon...
    if (props.icon in props.sprite) {
      let icon = props.sprite[props.icon];
      let { data: iconData, height, width } = icon.data;
      let imgData = new ImageData(
        Uint8ClampedArray.from(iconData),
        height,
        width
      );

      let canvas = canvasRef.current;
      canvas.height = height;
      canvas.width = width;

      canvas.style.setProperty("height", `${props.height}px`);
      canvas.style.setProperty("width", `${props.width}px`);

      canvas.getContext("2d").putImageData(imgData, 0, 0);
    }
  }, []);

  return (
    <Marker
      offsetTop={-props.height/2}
      offsetLeft={-props.width/2}
      width={props.width}
      height={props.height}
      longitude={props.longitude}
      latitude={props.latitude}
    >
      <canvas ref={canvasRef}></canvas>
    </Marker>
  );
};

spriteMarker.defaultProps = {};

export default spriteMarker;
