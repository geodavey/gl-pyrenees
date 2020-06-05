import React, { useState, useEffect } from 'react';
import isMobile from 'is-mobile';
import { format } from 'timeago.js';
import { Popup } from '@urbica/react-map-gl';
import Loader$1 from 'react-loader-spinner';
import { ChevronsRight, Info } from 'react-feather';
import 'mapbox-gl/dist/mapbox-gl.css';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var spainIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAA8CAYAAADmBa1FAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABxgAAAcYBF8H6RgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACuSURBVHic7duxDYAwDADBhJYd2H8QxFrJFDwFdxNYL1eWPJ/zWoPXHV8P8BdCR4SOCB0ROiJ0ROiI0BGhI0JHhI4IHRE6InRkrns4kwZsdEToiNARoSNCR4SOCB0ROiJ0ROiI0BGhI0JHhI4IHRE6InRE6IjQEaEjQkeEjggdEToidEToiNARoSNCR6an+4aNjggdEToidEToiNARoSNCR4SOCB0ROiJ0ROiI0JEN8e8HFFLz9p0AAAAASUVORK5CYII=";

var franceIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAA8CAYAAADmBa1FAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABegAAAXoBMrnI/AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACxSURBVHic7dBBEUBQAADRTxU3EUTSRzsZVKDF/oP3CuzMLmO73jHBe58zsuPZjynddUr1h4yOGB0xOmJ0xOiI0RGjI0ZHjI4YHTE6YnTE6IjREaMjRkeMjhgdMTpidMToiNERoyNGR4yOGB0xOmJ0xOiI0RGjI0ZHjI4YHTE6YnTE6IjREaMjRkeMjhgdMTpidMToiNERoyNGR4yOGB0xOmJ0xOiI0RGjI0ZHjI4YHfkAvuQFxp45g6sAAAAASUVORK5CYII=";

var andorraIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAA8CAYAAADmBa1FAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABRAAAAUQBTQy1XAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAC/SURBVHic7dAhFcJQAEDRD3oBaIBDrM6SrM0kYdCYicVAQgD8NXu3wDvnXcbt+R3QfD/Ga1tl8s++PMbnPdHmldZOrNFIo5FGI41GGo00Gmk00mik0UijkUYjjUYajTQaaTTSaKTRSKORRiONRhqNNBppNNJopNFIo5FGI41GGo00Gmk00mik0UijkUYjjUYajTQaaTTSaKTRSKORRiONRhqNNBppNNJopNFIo5FGI41GGo00Gmk00mik0UijkR/iBgiR0GG2XAAAAABJRU5ErkJggg==";

var FeaturePopup = function FeaturePopup(props) {
  console.log(props);

  var feature = props.feature,
      type = props.type,
      offsets = props.offsets,
      passedProps = _objectWithoutProperties(props, ["feature", "type", "offsets"]);

  var featProps = feature.properties;
  var layerId = feature.layer.id;

  var _feature$geometry$coo = _slicedToArray(feature.geometry.coordinates, 2),
      lon = _feature$geometry$coo[0],
      lat = _feature$geometry$coo[1];

  var isMobile$1 = isMobile();
  var popupOffset = typeof offsets[layerId] === "function" ? offsets[layerId](feature) : offsets[layerId];
  var countryIcons = {
    France: franceIcon,
    Spain: spainIcon,
    Andorra: andorraIcon
  };
  return /*#__PURE__*/React.createElement(Popup, _extends({
    longitude: lon,
    latitude: lat,
    offset: popupOffset,
    maxWidth: 512
  }, passedProps), layerId === "pyr_resupply" && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, featProps.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: countryIcons[featProps.country],
    style: {
      height: "1em",
      marginRight: "0.5em"
    }
  }), featProps.place, ", ", featProps.country), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "https://maps.google.com/?q=".concat(encodeURIComponent("".concat(featProps.name, ", ").concat(featProps.address))),
    target: "_blank"
  }, "(view on Google Maps)"))), layerId === "pyr_refuges" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "calc(100vw - 50px)",
      width: type === "detail" ? "320px" : "200px",
      paddingBottom: "66%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      position: "absolute",
      display: "flex",
      alignItems: "cener",
      justifyContent: "center"
    }
  }, featProps.photo && /*#__PURE__*/React.createElement("img", {
    src: "https://www.pyrenees-refuges.com/media/photo/".concat(featProps.photo),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) || /*#__PURE__*/React.createElement("div", null, "(no photo)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, type === "detail" && /*#__PURE__*/React.createElement("a", {
    href: "http://www.pyrenees-refuges.com/fr/affiche.php?numenr=".concat(featProps.id),
    target: "_blank"
  }, "(view on pyrenees-refuges.com)"), type === "hover" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold"
    }
  }, featProps.name || "(unknown)"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      fontSize: "0.8em"
    }
  }, /*#__PURE__*/React.createElement("span", null, "(via pyrenees-refuges.com)")))), type === "detail" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "bold"
    }
  }, "Name:"), featProps.name || "(unknown)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "bold"
    }
  }, "Altitude:"), "".concat(featProps.alt, "m") || "(unknown)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "bold"
    }
  }, "Capacity:"), featProps.cap || "(unknown)"))), layerId === "gdv_updates" && /*#__PURE__*/React.createElement("div", {
    style: {
      width: type === "detail" ? "360px" : "200px",
      maxWidth: "calc(100vw - 50px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: "66%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      position: "absolute",
      display: "flex",
      alignItems: "cener",
      justifyContent: "center"
    }
  }, featProps.photo && /*#__PURE__*/React.createElement("img", {
    src: "".concat(featProps.photo),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) || /*#__PURE__*/React.createElement("div", null, "(no photo)"))), /*#__PURE__*/React.createElement("div", {
    className: "font-barlow",
    style: {
      textAlign: "center",
      fontSize: type === "hover" ? "1.2em" : isMobile$1 ? "1.2em" : "1.5em",
      margin: type === "hover" ? "0.25em 0" : "0.35em 0"
    }
  }, type === "detail" && /*#__PURE__*/React.createElement("span", null, new Date(featProps.time).toUTCString(), " (", format(featProps.time), ")"), type === "hover" && /*#__PURE__*/React.createElement("span", null, featProps.time.split("T")[0], " (", format(featProps.time), ")")), /*#__PURE__*/React.createElement("div", {
    className: "font-palanquin",
    style: {
      position: "relative",
      lineHeight: type === "hover" ? "1.2em" : "1.5em",
      maxHeight: type === "hover" ? "3.6em" : "6em",
      fontSize: type === "hover" ? "0.9em" : "auto",
      overflowY: type === "hover" ? "hidden" : "scroll",
      textAlign: type === "hover" ? "justify" : "auto"
    }
  }, featProps.caption, type === "hover" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      background: "#fff",
      paddingLeft: "0.5em"
    }
  }, "..."))));
};

FeaturePopup.defaultProps = {
  offsets: {
    gdv_updates: function gdv_updates(f) {
      var gdvPinHeight = 114; // determine offset of popup layer by icon size
      // have the popup cursor start at 90% of the icon height

      var pinOffset = typeof f.layer.layout === "undefined" ? 50 : gdvPinHeight * 0.9 * f.layer.layout["icon-size"];
      return {
        top: [0, 0],
        "top-left": [0, 0],
        "top-right": [0, 0],
        bottom: [0, -pinOffset],
        "bottom-left": [0, -pinOffset],
        "bottom-right": [0, -pinOffset],
        left: [0, 0],
        right: [0, 0]
      };
    },
    pyr_refuges: 10,
    pyr_resupply: 10
  }
};
var popupHeights = {
  gdv_updates: 390,
  pyr_refuges: 250,
  pyr_resupply: 50
};

var Loader = (function (props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSuppressed = _useState2[0],
      setIsSuppressed = _useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      zIndex: "50",
      background: "rgba(255, 255, 255, 0.5)",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      display: isSuppressed ? "none" : "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    onClick: function onClick(e) {
      setIsSuppressed(true);
      if ("onSuppressed" in props) props.onSuppressed(e);
    }
  }, /*#__PURE__*/React.createElement(Loader$1, {
    type: "TailSpin",
    color: "#ccc",
    height: 80,
    width: 80
  }));
});

var SvgLine = function SvgLine(props) {
  return /*#__PURE__*/React.createElement("svg", {
    className: props.className,
    style: _objectSpread2({
      width: props.width,
      height: props.height
    }, props.style)
  }, props.lines.map(function (line, idx) {
    var lnY = (props.height - line.strokeWidth) / 2;
    return /*#__PURE__*/React.createElement("line", _extends({
      key: idx,
      x1: 0,
      x2: "100%",
      y1: lnY,
      y2: lnY
    }, line));
  }));
};

SvgLine.defaultProps = {
  width: 12,
  height: 12,
  lines: [{
    strokeWidth: 2,
    stroke: "#fff"
  }, {
    strokeWidth: 1,
    stroke: "#000"
  }],
  style: {},
  className: ""
};

var gdvPin = "data:image/png;base64,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";

var iconShopping = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABR1BMVEUAAAC3t7e4uLi6urq5ubm5ubm6urq4uLi5ubm2tra5ubm5ubm5ubm5ubm6urq5ubmzs7OysrK4uLi5ubm5ubmZmZm2tra5ubm6urq3t7e6urq5ubm6urq5ubm0tLSqqqq5ubm5ubm6urq5ubm5ubm5ubm5ubm5ubm6urq5ubm6urqwsLC5ubm5ubm6urq6urq5ubm7u7vAwMDU1NTp6en4+Pj9/f35+fns7Ozg4ODT09PHx8e8vLy+vr7Y2Njt7e3+/v7////39/fQ0NDFxcXz8/Pr6+vExMS6urr7+/vd3d3e3t7t7viJi89dYL5xdMaVl9Spq9z7+/1iZcD39/ttcMSQktKztODo6OjV1u729vteYb55e8mcntfZ2vBxc8br6/dpa8L9/f7m5vWGiM6qrN3Cw+ZuccW4uuL29vasrd1iZMDPz8+X2V9aAAAAMXRSTlMAJ3fE6/vxlWY4CzOI2PykGwqg83IFI9DTPUrvcz4iBtSH12d2w/rwlDejGnFJz5/Wvq5sbQAAAAFiS0dEQYnebE4AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkBgQPBy+u731gAAABxUlEQVQ4y22UZ1viUBCFB0FBUKQpLFh3xd4OKwFCKDEgRWVXt9h72VX8/58NNxESmPNl7uS+uSnPOUNkkWPI6Roecbo9o17i5BsbR1f+icAAEAzpG6nvu2kpk83JeQXhyKSdmIqiUCyV1U/taUDsi5WIJ1Cpqjbt14DpHjFdh9ZQ+yQ1lXr8k5iBcqAyOkBi1iDm5tFUWWmIBgUSQU3ikUYFoQ4RCGN/cPfwqPVDVasF+HRkAhpzwM/jk04pYoHI61f2GOTXb1FK+Eo0irxo/rTsMshyCg76Blk0f1lElbFIbuTE+pRHzpAkJ7Jifc4jabhoBBmxvrhkEQlLNAzzv12xSAbL5ELaaK5ZJCveZddobm45JIcVGjI/2q67++5He8iBVLkfeHh8ejaXeawSjaMkmpfeQy7//T8xiFfFr4dhDEXzjrf2m60Kx6x1woGCadt2q22ruoERXu8YJoRKgz9FqmHDiFCUdYyuJmJmmKYS4O2toBuleF1pDti38Y66NUhArc/A1QoSm9Y4zsQA7bW7Xy4VC9iatYd6MhKGkpdz2YyUPpNT+gzYDg7MhsCavzc8dhZ87ITxrnrcyeUlV3LRYb38AefD4vkRL9zGAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTA0VDE1OjExOjMxKzAxOjAwe1mszwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0wNFQxNTowNzo0NyswMTowMK+Bh9cAAAAASUVORK5CYII=";

var iconMountain = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABqlBMVEUAAAC3t7e4uLi6urq5ubm5ubm6urq4uLi5ubm2tra5ubm5ubm5ubm5ubm6urq5ubmzs7OysrK4uLi5ubm5ubmZmZm2tra5ubm6urq3t7e6urq5ubm6urq5ubm0tLSqqqq5ubm5ubm6urq5ubm5ubm5ubm5ubm5ubm6urq5ubm6urqwsLC5ubm5ubm6urq6urq5ubm7u7vAwMDU1NTp6en4+Pj9/f35+fns7Ozg4ODT09PHx8e8vLy+vr7Y2Njt7e3+/v7////39/fQ0NDFxcXz8/Pr6+vExMS6urr7+/vd3d3e3t7N36/b6MZ2pyPc6Mf7/PmMtUeGsTyNtUf8/fq/1pnS4rfc6cjA1prw9eZ8qy2bv2CmxXCkxG15qSjq8d7x9uh8qy6lxW7b58W30IvB15zo6OiLtUaGsT35+/WNtki/1pjT4rjd6cicv2D6/Pjp8Nvr8uD4+vOmxnGkxGx5qSnr8t/3+vKYvVr1+fD5+/aRuE/z9+zx9ul9qy/a58S30Yzy9+uQuE2iw2qtynuKtEPt9OPC2J2LtEX29vb9/fyTuVKTulPPz8+vD3zOAAAAMXRSTlMAJ3fE6/vxlWY4CzOI2PykGwqg83IFI9DTPUrvcz4iBtSH12d2w/rwlDejGnFJz5/Wvq5sbQAAAAFiS0dEQYnebE4AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkBgQPBTOI2EOtAAACF0lEQVQ4y22U6UMSURTFH4KCoMimEKhpiaath2TYhuXJjvqC1ArKNktt36N9z9Lqf25gYN4wzvky9575fbhv5p5HiEqGPqOpf8BotgxaiZ5sQ8NQZB9xHAKcLulF6PxiWIhEY/GECLdntJcY8yKZSmdoV0tZwHdETfgDyOVpjwpFYJwT4yVky1QjoSKW/F1iAuIy1dEyApMycXQKFaqrLLzONuJBUeD2ygqvyzm4WoTDjQJ3Vxm7wLt8EjYJGUGWe9XaxbXaOu9TmCbEaheXuLXBLl1mV3ifxjFCBpHgTr1xldJrjbpiZEIwkOOIc2Tz+g1Kb966zZ04ZogZMaXfYndaj7tsVbG2ESRGRJVZd3bvtZ7r92vVrheGiQwg0m0fsIdy8YhtKL8Bs6Qf3e9WbzymT55S+uw5faFMHMEcMSHc6V6+et18s/v23dr7Dx8/bXbMaHuWRbn5zL58/cbY9x+M/dz7xbZkN4YTpK9z6Opv1qOdaufQFmJAKCPPqpE8cQLzhAwjLZXNhhZpNCV7X7RLYRhCSqoP/miRvwftjVlohQNJzdpyFeA+2VoYF3JlfUIo4pQcIa96Y9SqwNcJ01gA+ustQomSvyRWBC1Q/oeSOkhAsdBL5HMInFbHccIHZPf5sqVTSZyZ7A31qMcNMRGPRSNCeDseku6As85Dd4Njwc4vj3PTNt0bxjpvMQfnZk3BGYPa/g/J7Oi+58uxjQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNi0wNFQxNToxMTozMSswMTowMHtZrM8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDYtMDRUMTU6MDU6NTErMDE6MDAEDmJOAAAAAElFTkSuQmCC";

var iconRefuge = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA/FBMVEUAAAC3t7e4uLi6urq5ubm5ubm6urq4uLi5ubm2tra5ubm5ubm5ubm5ubm6urq5ubmzs7OysrK4uLi5ubm5ubmZmZm2tra5ubm6urq3t7e6urq5ubm6urq5ubm0tLSqqqq5ubm5ubm6urq5ubm5ubm5ubm5ubm5ubm6urq5ubm6urqwsLC5ubm5ubm6urq6urq5ubm7u7vAwMDU1NTp6en4+Pj9/f35+fns7Ozg4ODT09PHx8e8vLy+vr7Y2Njt7e3+/v7////39/fQ0NDFxcXz8/Pr6+vExMS6urr7+/vd3d3e3t7m4uC3q6aIdGxyWlCJdWzo6Oj29vbPz8/t0TcPAAAAMXRSTlMAJ3fE6/vxlWY4CzOI2PykGwqg83IFI9DTPUrvcz4iBtSH12d2w/rwlDejGnFJz5/Wvq5sbQAAAAFiS0dEQYnebE4AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkBgQPCC3HeQCDAAABlElEQVQ4y32U13aCUBBFx94rttgSE0s09RhFRSwI9hbN//9LwIpydT/BPfsB7pozRDpMZovVZrc4nC43sfB4fTjhDwQNQiisBtWfWp1vNFtCWwQXiV4asTg63V5fOjKQgcSD3kimoAylC0ZjIH020hPIU+kKfiZOkkcjA3EuMZgjld0bj0+YSUxkxEM7JYIxb0gXy5UkTRWENSPIYWTM1+u1+jDswKMqAciMfK9IXeSI3H5xwMgPSg/PRC60WfnvcqEd9asw0QuEW7mGgDw50No9s3KVDQpkQVOnXOYqdVjJjoZOMdwPjyLZsL+31ZKpNFAiK+qHN6bS3H1L7Z7SwiuZDz99QxHgJBOq/TtKG2UiH3pnRY92thX9ahm86N5WZFS0cqAzvKWMwL1pAxOGMmUr/Bjv+wrFrybmxAyJQ5liKbDHW8SpSsmJODOM7/QPE32RgPHVAA8VpD70dcwkAHl7yvu9bgef2ctSRyMcxLbQajb4+kaoqjvgK2TYDcGK/7w8vnMe5oZxl52OQqloLeRN+uN/xfPf70j00qIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDYtMDRUMTU6MTE6MzErMDE6MDB7WazPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA2LTA0VDE1OjA4OjQ1KzAxOjAwyRXNcwAAAABJRU5ErkJggg==";

var Infobox = (function (props) {
  var _useState = useState(props.isOpen),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var iconProps = {
    onClick: function onClick() {
      setIsOpen(!isOpen);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mapboxgl-ctrl-group mapboxgl-ctrl-infobox",
    style: isOpen ? {
      position: "absolute",
      margin: "10px",
      top: 0,
      right: 0,
      zIndex: 99,
      width: 300,
      maxWidth: "calc(100vw - 20px)",
      maxHeight: "calc(100vh - 20px)",
      overflowY: "auto"
    } : {
      position: "absolute",
      margin: "10px",
      top: 0,
      right: 0,
      zIndex: 99,
      overflow: "hidden",
      width: "30px",
      height: "30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mapboxgl-ctrl",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon",
    style: {
      "float": "right",
      margin: "3px"
    }
  }, isOpen ? /*#__PURE__*/React.createElement(ChevronsRight, iconProps) : /*#__PURE__*/React.createElement(Info, iconProps)), /*#__PURE__*/React.createElement("div", {
    className: "content",
    style: {
      padding: 10
    }
  }, /*#__PURE__*/React.createElement("h1", null, "Pyrenees Adventure Map"), /*#__PURE__*/React.createElement("p", null, "Open source interactive online map of Pyrenees mountain range with live backpacker tracking"), /*#__PURE__*/React.createElement("h2", null, "Map Symbology"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement("img", {
    className: "symbol-icon",
    src: gdvPin
  }), " Location Update"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement(SvgLine, {
    className: "symbol-icon",
    lines: [{
      stroke: "#fff",
      strokeWidth: 5
    }, {
      stroke: "#d582ff",
      strokeWidth: 3
    }]
  }), " ", "Trekking Route"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement("img", {
    className: "symbol-icon",
    src: iconMountain
  }), " Peak >3000m"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement("img", {
    className: "symbol-icon",
    src: iconRefuge
  }), " Refuge"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement("img", {
    className: "symbol-icon",
    src: iconShopping
  }), " Resupply"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement(SvgLine, {
    className: "symbol-icon",
    lines: [{
      stroke: "#fff",
      strokeWidth: 5
    }, {
      stroke: "#f00",
      strokeWidth: 3
    }]
  }), " ", "Haute Randonn\xE9e Pyr\xE9n\xE9enne (HRP)"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement(SvgLine, {
    className: "symbol-icon",
    lines: [{
      stroke: "#fff",
      strokeWidth: 5
    }, {
      stroke: "rgba(234, 118, 24, 1)",
      strokeWidth: 3
    }]
  }), " ", "Major Hiking Route"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement(SvgLine, {
    className: "symbol-icon",
    lines: [{
      stroke: "#fff",
      strokeWidth: 5
    }, {
      stroke: "rgba(234, 118, 24, 1)",
      strokeDasharray: "3 2",
      strokeWidth: 2
    }]
  }), " ", "Minor Route"), /*#__PURE__*/React.createElement("div", {
    className: "symbol"
  }, /*#__PURE__*/React.createElement(SvgLine, {
    className: "symbol-icon",
    lines: [{
      stroke: "#fff",
      strokeWidth: 5
    }, {
      stroke: "#000",
      strokeWidth: 2
    }]
  }), " ", "Automobile Road")), /*#__PURE__*/React.createElement("h2", null, "Map Data Sources"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1em"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://openstreetmap.org",
    target: "_blank"
  }, "OpenStreetMap")), /*#__PURE__*/React.createElement("div", null, "Hiking routes, peaks, base vector data")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1em"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://maptiler.com",
    target: "_blank"
  }, "MapTiler")), /*#__PURE__*/React.createElement("div", null, "Hillshade, contours, tile hosting")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1em"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://pyrenees-refuges.com",
    target: "_blank"
  }, "pyrenees-refuges.com")), /*#__PURE__*/React.createElement("div", null, "Pyrenees refuges database & photos")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1em"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://maps.google.com",
    target: "_blank"
  }, "Google Maps")), /*#__PURE__*/React.createElement("div", null, "Resupply supermarket locations"))), /*#__PURE__*/React.createElement("h2", null, "Source Code"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1em"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/1papaya/gl-pyrenees",
    target: "_blank"
  }, "gl-pyrenees")), /*#__PURE__*/React.createElement("p", null, "Interactive map source code, written in React and Mapbox GL JS")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.1em"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/1papaya/caminoBot",
    target: "_blank"
  }, "caminoBot")), /*#__PURE__*/React.createElement("p", null, "Location updater source code, using Telegram, Netlify, FaunaDB, OpenRouteService"))), /*#__PURE__*/React.createElement("h2", null, "Special Acknowledgements"), /*#__PURE__*/React.createElement("p", null, "Big shout out to the OSM France & Spain communities for contributing such quality data to the OSM basemap, especially", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://wiki.openstreetmap.org/wiki/HRP",
    target: "_blank"
  }, "those who worked on the massive HRP route relation"), ". Bon travail / Buen trabajo ! :)"), /*#__PURE__*/React.createElement("p", null, "Also big shout out to", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://pyrenees-refuges.com",
    target: "_blank"
  }, "pyrenees-refuges.com"), "! Amazing dataset, merci for making it available!"), /*#__PURE__*/React.createElement("p", null, "Last, big ups to Mapbox, Netlify, MapTiler and Github for their free offerings which make this site possible. You da real MVP!"))));
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".mapboxgl-map{font:12px/20px Helvetica Neue,Arial,Helvetica,sans-serif;overflow:hidden;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mapboxgl-canvas{position:absolute;left:0;top:0}.mapboxgl-map:-webkit-full-screen{width:100%;height:100%}.mapboxgl-canary{background-color:salmon}.mapboxgl-canvas-container.mapboxgl-interactive,.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-track-pointer{cursor:pointer}.mapboxgl-canvas-container.mapboxgl-interactive:active,.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass:active{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas{touch-action:pan-x pan-y}.mapboxgl-canvas-container.mapboxgl-touch-drag-pan,.mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas{touch-action:pinch-zoom}.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas{touch-action:none}.mapboxgl-ctrl-bottom-left,.mapboxgl-ctrl-bottom-right,.mapboxgl-ctrl-top-left,.mapboxgl-ctrl-top-right{position:absolute;pointer-events:none;z-index:2}.mapboxgl-ctrl-top-left{top:0;left:0}.mapboxgl-ctrl-top-right{top:0;right:0}.mapboxgl-ctrl-bottom-left{bottom:0;left:0}.mapboxgl-ctrl-bottom-right{right:0;bottom:0}.mapboxgl-ctrl{clear:both;pointer-events:auto;transform:translate(0)}.mapboxgl-ctrl-top-left .mapboxgl-ctrl{margin:10px 0 0 10px;float:left}.mapboxgl-ctrl-top-right .mapboxgl-ctrl{margin:10px 10px 0 0;float:right}.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl{margin:0 0 10px 10px;float:left}.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl{margin:0 10px 10px 0;float:right}.mapboxgl-ctrl-group{border-radius:4px;background:#fff}.mapboxgl-ctrl-group:not(:empty){-moz-box-shadow:0 0 2px rgba(0,0,0,.1);-webkit-box-shadow:0 0 2px rgba(0,0,0,.1);box-shadow:0 0 0 2px rgba(0,0,0,.1)}@media (-ms-high-contrast:active){.mapboxgl-ctrl-group:not(:empty){box-shadow:0 0 0 2px ButtonText}}.mapboxgl-ctrl-group button{width:29px;height:29px;display:block;padding:0;outline:none;border:0;box-sizing:border-box;background-color:transparent;cursor:pointer}.mapboxgl-ctrl-group button+button{border-top:1px solid #ddd}.mapboxgl-ctrl button .mapboxgl-ctrl-icon{display:block;width:100%;height:100%;background-repeat:no-repeat;background-position:50%}@media (-ms-high-contrast:active){.mapboxgl-ctrl-icon{background-color:transparent}.mapboxgl-ctrl-group button+button{border-top:1px solid ButtonText}}.mapboxgl-ctrl button::-moz-focus-inner{border:0;padding:0}.mapboxgl-ctrl-group button:focus{box-shadow:0 0 2px 2px #0096ff}.mapboxgl-ctrl button:disabled{cursor:not-allowed}.mapboxgl-ctrl button:disabled .mapboxgl-ctrl-icon{opacity:.25}.mapboxgl-ctrl button:not(:disabled):hover{background-color:rgba(0,0,0,.05)}.mapboxgl-ctrl-group button:focus:focus-visible{box-shadow:0 0 2px 2px #0096ff}.mapboxgl-ctrl-group button:focus:not(:focus-visible){box-shadow:none}.mapboxgl-ctrl-group button:focus:first-child{border-radius:4px 4px 0 0}.mapboxgl-ctrl-group button:focus:last-child{border-radius:0 0 4px 4px}.mapboxgl-ctrl-group button:focus:only-child{border-radius:inherit}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E\")}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E\")}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E\")}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23999'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23aaa'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='M14 5l1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting .mapboxgl-ctrl-icon{-webkit-animation:mapboxgl-spin 2s linear infinite;-moz-animation:mapboxgl-spin 2s infinite linear;-o-animation:mapboxgl-spin 2s infinite linear;-ms-animation:mapboxgl-spin 2s infinite linear;animation:mapboxgl-spin 2s linear infinite}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23999'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='M14 5l1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23666'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='M14 5l1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E\")}}@-webkit-keyframes mapboxgl-spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@-moz-keyframes mapboxgl-spin{0%{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(1turn)}}@-o-keyframes mapboxgl-spin{0%{-o-transform:rotate(0deg)}to{-o-transform:rotate(1turn)}}@-ms-keyframes mapboxgl-spin{0%{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(1turn)}}@keyframes mapboxgl-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}a.mapboxgl-ctrl-logo{width:88px;height:23px;margin:0 0 -4px -4px;display:block;background-repeat:no-repeat;cursor:pointer;overflow:hidden;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E%3Cdefs%3E%3Cpath id='a' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E%3Cpath id='b' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E%3C/defs%3E%3Cmask id='c'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3Cg opacity='.3' stroke='%23000' stroke-width='3'%3E%3Ccircle mask='url(%23c)' cx='11.5' cy='11.5' r='9.25'/%3E%3Cuse xlink:href='%23b' mask='url(%23c)'/%3E%3C/g%3E%3Cg opacity='.9' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/g%3E%3C/svg%3E\")}a.mapboxgl-ctrl-logo.mapboxgl-compact{width:23px}@media (-ms-high-contrast:active){a.mapboxgl-ctrl-logo{background-color:transparent;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E%3Cdefs%3E%3Cpath id='a' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E%3Cpath id='b' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E%3C/defs%3E%3Cmask id='c'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3Cg stroke='%23000' stroke-width='3'%3E%3Ccircle mask='url(%23c)' cx='11.5' cy='11.5' r='9.25'/%3E%3Cuse xlink:href='%23b' mask='url(%23c)'/%3E%3C/g%3E%3Cg fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/g%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){a.mapboxgl-ctrl-logo{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E%3Cdefs%3E%3Cpath id='a' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E%3Cpath id='b' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E%3C/defs%3E%3Cmask id='c'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3Cg stroke='%23fff' stroke-width='3' fill='%23fff'%3E%3Ccircle mask='url(%23c)' cx='11.5' cy='11.5' r='9.25'/%3E%3Cuse xlink:href='%23b' mask='url(%23c)'/%3E%3C/g%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl.mapboxgl-ctrl-attrib{padding:0 5px;background-color:hsla(0,0%,100%,.5);margin:0}@media screen{.mapboxgl-ctrl-attrib.mapboxgl-compact{min-height:20px;padding:0;margin:10px;position:relative;background-color:#fff;border-radius:3px 12px 12px 3px}.mapboxgl-ctrl-attrib.mapboxgl-compact:hover{padding:2px 24px 2px 4px;visibility:visible;margin-top:6px}.mapboxgl-ctrl-bottom-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:hover,.mapboxgl-ctrl-top-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:hover{padding:2px 4px 2px 24px;border-radius:12px 3px 3px 12px}.mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-inner{display:none}.mapboxgl-ctrl-attrib.mapboxgl-compact:hover .mapboxgl-ctrl-attrib-inner{display:block}.mapboxgl-ctrl-attrib.mapboxgl-compact:after{content:\"\";cursor:pointer;position:absolute;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1012 0 6 6 0 10-12 0m5-3a1 1 0 102 0 1 1 0 10-2 0m0 3a1 1 0 112 0v3a1 1 0 11-2 0'/%3E%3C/svg%3E\");background-color:hsla(0,0%,100%,.5);width:24px;height:24px;box-sizing:border-box;border-radius:12px}.mapboxgl-ctrl-bottom-right>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{bottom:0;right:0}.mapboxgl-ctrl-top-right>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{top:0;right:0}.mapboxgl-ctrl-top-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{top:0;left:0}.mapboxgl-ctrl-bottom-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{bottom:0;left:0}}@media screen and (-ms-high-contrast:active){.mapboxgl-ctrl-attrib.mapboxgl-compact:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' fill='%23fff'%3E%3Cpath d='M4 10a6 6 0 1012 0 6 6 0 10-12 0m5-3a1 1 0 102 0 1 1 0 10-2 0m0 3a1 1 0 112 0v3a1 1 0 11-2 0'/%3E%3C/svg%3E\")}}@media screen and (-ms-high-contrast:black-on-white){.mapboxgl-ctrl-attrib.mapboxgl-compact:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1012 0 6 6 0 10-12 0m5-3a1 1 0 102 0 1 1 0 10-2 0m0 3a1 1 0 112 0v3a1 1 0 11-2 0'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl-attrib a{color:rgba(0,0,0,.75);text-decoration:none}.mapboxgl-ctrl-attrib a:hover{color:inherit;text-decoration:underline}.mapboxgl-ctrl-attrib .mapbox-improve-map{font-weight:700;margin-left:2px}.mapboxgl-attrib-empty{display:none}.mapboxgl-ctrl-scale{background-color:hsla(0,0%,100%,.75);font-size:10px;border:2px solid #333;border-top:#333;padding:0 5px;color:#333;box-sizing:border-box}.mapboxgl-popup{position:absolute;top:0;left:0;display:-webkit-flex;display:flex;will-change:transform;pointer-events:none}.mapboxgl-popup-anchor-top,.mapboxgl-popup-anchor-top-left,.mapboxgl-popup-anchor-top-right{-webkit-flex-direction:column;flex-direction:column}.mapboxgl-popup-anchor-bottom,.mapboxgl-popup-anchor-bottom-left,.mapboxgl-popup-anchor-bottom-right{-webkit-flex-direction:column-reverse;flex-direction:column-reverse}.mapboxgl-popup-anchor-left{-webkit-flex-direction:row;flex-direction:row}.mapboxgl-popup-anchor-right{-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.mapboxgl-popup-tip{width:0;height:0;border:10px solid transparent;z-index:1}.mapboxgl-popup-anchor-top .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-top:none;border-bottom-color:#fff}.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip{-webkit-align-self:flex-start;align-self:flex-start;border-top:none;border-left:none;border-bottom-color:#fff}.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip{-webkit-align-self:flex-end;align-self:flex-end;border-top:none;border-right:none;border-bottom-color:#fff}.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-bottom:none;border-top-color:#fff}.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip{-webkit-align-self:flex-start;align-self:flex-start;border-bottom:none;border-left:none;border-top-color:#fff}.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip{-webkit-align-self:flex-end;align-self:flex-end;border-bottom:none;border-right:none;border-top-color:#fff}.mapboxgl-popup-anchor-left .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-left:none;border-right-color:#fff}.mapboxgl-popup-anchor-right .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-right:none;border-left-color:#fff}.mapboxgl-popup-close-button{position:absolute;right:0;top:0;border:0;border-radius:0 3px 0 0;cursor:pointer;background-color:transparent}.mapboxgl-popup-close-button:hover{background-color:rgba(0,0,0,.05)}.mapboxgl-popup-content{position:relative;background:#fff;border-radius:3px;box-shadow:0 1px 2px rgba(0,0,0,.1);padding:10px 10px 15px;pointer-events:auto}.mapboxgl-popup-anchor-top-left .mapboxgl-popup-content{border-top-left-radius:0}.mapboxgl-popup-anchor-top-right .mapboxgl-popup-content{border-top-right-radius:0}.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content{border-bottom-left-radius:0}.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content{border-bottom-right-radius:0}.mapboxgl-popup-track-pointer{display:none}.mapboxgl-popup-track-pointer *{pointer-events:none;user-select:none}.mapboxgl-map:hover .mapboxgl-popup-track-pointer{display:flex}.mapboxgl-map:active .mapboxgl-popup-track-pointer{display:none}.mapboxgl-marker{position:absolute;top:0;left:0;will-change:transform}.mapboxgl-user-location-dot,.mapboxgl-user-location-dot:before{background-color:#1da1f2;width:15px;height:15px;border-radius:50%}.mapboxgl-user-location-dot:before{content:\"\";position:absolute;-webkit-animation:mapboxgl-user-location-dot-pulse 2s infinite;-moz-animation:mapboxgl-user-location-dot-pulse 2s infinite;-ms-animation:mapboxgl-user-location-dot-pulse 2s infinite;animation:mapboxgl-user-location-dot-pulse 2s infinite}.mapboxgl-user-location-dot:after{border-radius:50%;border:2px solid #fff;content:\"\";height:19px;left:-2px;position:absolute;top:-2px;width:19px;box-sizing:border-box;box-shadow:0 0 3px rgba(0,0,0,.35)}@-webkit-keyframes mapboxgl-user-location-dot-pulse{0%{-webkit-transform:scale(1);opacity:1}70%{-webkit-transform:scale(3);opacity:0}to{-webkit-transform:scale(1);opacity:0}}@-ms-keyframes mapboxgl-user-location-dot-pulse{0%{-ms-transform:scale(1);opacity:1}70%{-ms-transform:scale(3);opacity:0}to{-ms-transform:scale(1);opacity:0}}@keyframes mapboxgl-user-location-dot-pulse{0%{transform:scale(1);opacity:1}70%{transform:scale(3);opacity:0}to{transform:scale(1);opacity:0}}.mapboxgl-user-location-dot-stale{background-color:#aaa}.mapboxgl-user-location-dot-stale:after{display:none}.mapboxgl-user-location-accuracy-circle{background-color:rgba(29,161,242,.2);width:1px;height:1px;border-radius:100%}.mapboxgl-crosshair,.mapboxgl-crosshair .mapboxgl-interactive,.mapboxgl-crosshair .mapboxgl-interactive:active{cursor:crosshair}.mapboxgl-boxzoom{position:absolute;top:0;left:0;width:0;height:0;background:#fff;border:2px dotted #202020;opacity:.5}@media print{.mapbox-improve-map{display:none}}.mapboxgl-ctrl-infobox {\n  font-family: \"Palanquin\";\n  font-size: 1.1em;\n}.mapboxgl-ctrl-infobox h1,\n.mapboxgl-ctrl-infobox h2,\n.mapboxgl-ctrl-infobox h3,\n.mapboxgl-ctrl-infobox h4,\n.mapboxgl-ctrl-infobox h5,\n.mapboxgl-ctrl-infobox h6 {\n  font-family: \"Barlow Condensed\";\n}.mapboxgl-ctrl-infobox h1:not(:first-child),\n.mapboxgl-ctrl-infobox h2:not(:first-child),\n.mapboxgl-ctrl-infobox h3:not(:first-child),\n.mapboxgl-ctrl-infobox h4:not(:first-child),\n.mapboxgl-ctrl-infobox h5:not(:first-child),\n.mapboxgl-ctrl-infobox h6:not(:first-child) {\n  margin: 0.35em 0 0.35em 0;\n}.mapboxgl-ctrl-infobox h1:first-child,\n.mapboxgl-ctrl-infobox h2:first-child,\n.mapboxgl-ctrl-infobox h3:first-child,\n.mapboxgl-ctrl-infobox h4:first-child,\n.mapboxgl-ctrl-infobox h5:first-child,\n.mapboxgl-ctrl-infobox h6:first-child {\n  margin: 0 0 0.35em 0;\n}.mapboxgl-ctrl-infobox p {\n  line-height: 1.2;\n}.mapboxgl-ctrl-infobox p:not(:last-child) {\n  margin: 0 0 0.25em 0;\n}.mapboxgl-ctrl-infobox p:last-child {\n  margin: 0;\n}.mapboxgl-ctrl-infobox .icon > svg:hover {\n  border-radius: 4px;\n  cursor: pointer;\n  background-color: #eee;\n}.mapboxgl-ctrl-infobox .symbol {\n  margin-right: 8px;\n}.mapboxgl-ctrl-infobox .symbol .symbol-icon {\n  display: inline-block;\n  vertical-align: middle;\n  height: 18px;\n}.mapboxgl-ctrl-infobox ul {\n  padding-left: 1em;\n  margin: 0;\n}@font-face {\n  font-family: \"Palanquin\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Palanquin Regular\"), local(\"Palanquin-Regular\"), url(\"./style/fonts/palanquin-v5-web.woff2\") format(\"woff2\");\n}.font-palanquin {\n  font-family: \"Palanquin\";\n}@font-face {\n  font-family: \"Barlow Condensed\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Barlow Condensed Regular\"), local(\"BarlowCondensed-Regular\"), url(\"./style/fonts/barlow-condensed-v4-latin-regular.woff2\") format(\"woff2\");\n}.font-barlow {\n  font-family: \"Barlow Condensed\";\n}.mapboxgl-ctrl-attrib.mapboxgl-compact {\n  text-align: center;\n}.mapboxgl-ctrl-attrib.mapboxgl-compact::after {\n  background-image: url(./style/heart.png) !important;\n}.mapboxgl-popup-close-button {\n  z-index: 90;\n  font-size: 1em;\n  width: 24px;\n  height: 26px;\n  background-color: rgba(255, 255, 255, 0.4);\n}.mapboxgl-popup-close-button:hover {\n  background-color: rgba(255, 255, 255, 0.9) !important;\n}.mapboxgl-popup-content {\n  padding: 10px !important;\n}";
styleInject(css_248z);

var Map = function Map(props) {
  var mapRef = /*#__PURE__*/React.createRef(); //
  // Viewport
  //
  // set initial view to be last update

  var lastUpdate = props.data.updates.features[props.data.updates.features.length - 1];

  var _useState = useState({
    longitude: lastUpdate.geometry.coordinates[0],
    latitude: lastUpdate.geometry.coordinates[1],
    zoom: 10
  }),
      _useState2 = _slicedToArray(_useState, 2),
      viewport = _useState2[0],
      setViewport = _useState2[1]; //
  // Popup interaction
  //


  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedFeature = _useState4[0],
      setSelectedFeature = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      hoveredFeature = _useState6[0],
      setHoveredFeature = _useState6[1]; // fly to feature once selected


  useEffect(function () {
    if (selectedFeature) setViewport({
      longitude: selectedFeature.geometry.coordinates[0],
      latitude: selectedFeature.geometry.coordinates[1],
      zoom: viewport.zoom + 0.000001,
      viewportChangeMethod: "flyTo",
      viewportChangeOptions: {
        duration: 2000,
        padding: {
          top: popupHeights[selectedFeature.layer.id]
        }
      }
    });
  }, [selectedFeature]); //
  // Lazy load map-gl and style
  //

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      MapGL = _useState8[0],
      setMapGL = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      mapStyle = _useState10[0],
      setMapStyle = _useState10[1];

  useEffect(function () {
    import(
    /* webpackChunkName: "mapGL" */
    '@urbica/react-map-gl').then(function (MapGL) {
      return setMapGL(MapGL);
    });
    import(
    /* webpackChunkName: "mapStyle" */
    './style-5e679520.js').then(function (mapStyle) {
      return setMapStyle(mapStyle);
    });
  }, []); //
  // Swap layer Sources & Set-up Interactivity
  //

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isMapLoaded = _useState12[0],
      setIsMapLoaded = _useState12[1];

  useEffect(function () {
    if (mapStyle && MapGL && mapRef.current) {
      var map = mapRef.current.getMap();
      map.once("load", function (e) {
        setIsMapLoaded(true);
      }); // add custom icons [iconName, iconURL]

      var icons = [["gdvPin", gdvPin]];
      icons.forEach(function (ic) {
        map.loadImage(ic[1], function (err, data) {
          map.addImage(ic[0], data);
        });
      }); // initialize with latest update featured

      setSelectedFeature(_objectSpread2(_objectSpread2({}, lastUpdate), {}, {
        layer: {
          id: "gdv_updates"
        }
      })); // Popup Layers

      var popupLayers = ["pyr_refuges", "pyr_resupply", "gdv_updates"];
      popupLayers.forEach(function (lyr) {
        map.on("click", lyr, function (e) {
          setHoveredFeature(null); // this fires before <Popup onClose={}> sometimes which is problematic
          // give it a lil' delay, won't hurt no body

          setTimeout(setSelectedFeature, 100, e.features[0]);
        });
      }); // Hover Layers

      var hoverLayers = ["pyr_refuges", "gdv_updates"]; // only set hover layers on mobile

      if (!isMobile()) hoverLayers.forEach(function (lyr) {
        map.on("mousemove", lyr, function (e) {
          setHoveredFeature(e.features[0]);
        });
        map.on("mouseleave", lyr, function (e) {
          setHoveredFeature(null);
        });
      }); // Set cursor to pointer on popup & hover layers

      var cursorLayers = [].concat(popupLayers, hoverLayers);
      cursorLayers.forEach(function (lyr) {
        map.on("mousemove", lyr, function (e) {
          map.getCanvas().style.setProperty("cursor", "pointer");
        });
        map.on("mouseleave", lyr, function (e) {
          map.getCanvas().style.removeProperty("cursor");
        });
      });
      map.on("style.load", function (e) {
        // replace test source data with real data
        map.getSource("gdv_tracks").setData(data.tracks);
        map.getSource("gdv_updates").setData(data.updates);
      });
    }
  }, [mapStyle, MapGL]);
  var data = props.data;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%"
    }
  }, !isMapLoaded && /*#__PURE__*/React.createElement(Loader, {
    onSuppressed: function onSuppressed() {
      return (// fire fake load event on loader suppression
        // will force controls to be rendered
        mapRef.current.getMap().fire("load", {
          fake: true
        })
      );
    }
  }), MapGL && mapStyle && /*#__PURE__*/React.createElement(MapGL["default"], _extends({}, viewport, {
    ref: mapRef,
    style: {
      width: "100%",
      height: "100%"
    },
    attributionControl: false,
    refreshExpiredTiles: false,
    onViewportChange: setViewport,
    mapStyle: mapStyle,
    transformRequest: function transformRequest(url) {
      // rewrite references from style
      var url_ = new URL(url);
      var loc = window.location;
      var baseURL = props.dataBaseURL ? props.dataBaseURL : "".concat(loc.origin).concat(loc.pathname);
      if (url.search("//localhost") != -1) return {
        url: "".concat(baseURL).concat(url_.pathname)
      };
    }
  }), hoveredFeature && (!selectedFeature || selectedFeature.properties.id !== hoveredFeature.properties.id) && /*#__PURE__*/React.createElement(FeaturePopup, {
    feature: hoveredFeature,
    closeButton: false,
    type: "hover",
    onClose: function onClose() {
      return setHoveredFeature(null);
    }
  }), "}}", selectedFeature && /*#__PURE__*/React.createElement(FeaturePopup, {
    feature: selectedFeature,
    type: "detail",
    closeOnClick: true,
    onClose: function onClose() {
      return setSelectedFeature(null);
    }
  }), /*#__PURE__*/React.createElement(Infobox, {
    isOpen: !isMobile()
  }), /*#__PURE__*/React.createElement(MapGL.NavigationControl, {
    showZoom: true,
    position: "top-left"
  }), /*#__PURE__*/React.createElement(MapGL.FullscreenControl, {
    position: "top-left"
  }), /*#__PURE__*/React.createElement(MapGL.ScaleControl, {
    maxWidth: 100,
    unit: "metric",
    position: "bottom-left"
  }), /*#__PURE__*/React.createElement(MapGL.AttributionControl, {
    compact: true,
    position: "bottom-right",
    customAttribution: "<a style='display:block;text-align:center;font-size:20px;margin:0.3em 0 0.3em 0.8em;border-bottom:1px solid #ccc' href='https://github.com/1papaya/gl-pyrenees'>\xA1 Viva La Open Source !</a>"
  }), /*#__PURE__*/React.createElement(MapGL.GeolocateControl, {
    position: "top-left"
  })));
};

Map.defaultProps = {
  data: {
    updates: [],
    tracks: []
  },
  baseDataURL: null
};

export default Map;
//# sourceMappingURL=index.js.map
