import React from "react";

import { Popup } from "@urbica/react-map-gl";

const FeaturePopup = (props) => {
  let { feature, type, offsets, ...passedProps } = props;
  let featProps = feature.properties;
  let layerId = feature.layer.id;

  let [lon, lat] = feature.geometry.coordinates;
  let popupOffset = offsets[layerId];

  return (
    <Popup longitude={lon} latitude={lat} offset={popupOffset} {...passedProps}>
      {/* pyr_refuges */}
      {layerId === "pyr_refuges" && (
        <div>
          <div
            style={{
              width: "100%",
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
            {type === "detail" && (
              <a
                href={`http://www.pyrenees-refuges.com/fr/affiche.php?numenr=${featProps.id}`}
                target="_blank"
              >
                (view on pyrenees-refuges.com)
              </a>
            )}
            {type === "hover" && (
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {featProps.name || "(unknown)"}
                </div>
                <div style={{ textAlign: "right", fontSize: "0.8em" }}>
                  <span>(via pyrenees-refuges.com)</span>
                </div>
              </div>
            )}
          </div>
          {type === "detail" && (
            <div>
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
            </div>
          )}
        </div>
      )}
      {/* gdv_updates */}
      {layerId === "gdv_updates" && (
        <div style={{ height: 250, width: 300 }}>sko buffs</div>
      )}
    </Popup>
  );
};

FeaturePopup.defaultProps = {
  offsets: {
    gdv_updates: {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -50],
      "bottom-left": [0, -50],
      "bottom-right": [0, -50],
      left: [0, 0],
      right: [0, 0],
    },
    pyr_refuges: 10,
  },
};

export default FeaturePopup;
