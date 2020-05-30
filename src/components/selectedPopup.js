import React from "react";
import { Popup } from "@urbica/react-map-gl";

export default (props) => {
  let { feature } = props;
  let featProps = feature.properties;
  let layerId = feature.layer.id;

  let [lon, lat] = feature.geometry.coordinates;

  if (layerId === "pyr_refuges")
    return (
      <Popup longitude={lon} latitude={lat} closeOnClick={false} maxWidth={400} onClose={props.onClose}>
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
            )) || <div>(no photo)</div>}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            href={`http://www.pyrenees-refuges.com/fr/affiche.php?numenr=${featProps.id}`}
            target="_blank"
          >
            (view on pyrenees-refuges.com)
          </a>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Name:</span>
          {featProps.name || "(unknown)"}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Altitude:</span>
          {`${featProps.alt}m` || "(unknown)"}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Capacity:</span>
          {featProps.cap || "(unknown)"}
        </div>
      </Popup>
    );
};