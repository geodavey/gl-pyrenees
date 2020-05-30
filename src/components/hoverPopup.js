import React from "react";
import { Popup } from "@urbica/react-map-gl";

export default (props) => {
  let { feature } = props;
  let featProps = feature.properties;
  let layerId = feature.layer.id;

  let [lon, lat] = feature.geometry.coordinates;

  if (layerId === "pyr_refuges")
    return (
      <Popup longitude={lon} latitude={lat} maxWidth={400}>
        <div
          style={{
            width: "280px",
            paddingBottom: "66%",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "cener",
              justifyContent: "center",
            }}
          >
            {(featProps.photo && (
              <img
                src={`https://www.pyrenees-refuges.com/media/photo/${featProps.photo}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )) || <div style={{ height: "100%" }}>(no photo)</div>}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {featProps.name || "(unknown name)"}
        </div>
      </Popup>
    );
};
