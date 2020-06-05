import React, { useState, useEffect } from 'react';
import isMobile from 'is-mobile';
import { format } from 'timeago.js';
import { Popup } from '@urbica/react-map-gl';
import Loader$1 from 'react-loader-spinner';
import { ChevronsRight, Info } from 'react-feather';

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

var css_248z = ".mapboxgl-map{font:12px/20px Helvetica Neue,Arial,Helvetica,sans-serif;overflow:hidden;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mapboxgl-canvas{position:absolute;left:0;top:0}.mapboxgl-map:-webkit-full-screen{width:100%;height:100%}.mapboxgl-canary{background-color:salmon}.mapboxgl-canvas-container.mapboxgl-interactive,.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-track-pointer{cursor:pointer}.mapboxgl-canvas-container.mapboxgl-interactive:active,.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass:active{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas{touch-action:pan-x pan-y}.mapboxgl-canvas-container.mapboxgl-touch-drag-pan,.mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas{touch-action:pinch-zoom}.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas{touch-action:none}.mapboxgl-ctrl-bottom-left,.mapboxgl-ctrl-bottom-right,.mapboxgl-ctrl-top-left,.mapboxgl-ctrl-top-right{position:absolute;pointer-events:none;z-index:2}.mapboxgl-ctrl-top-left{top:0;left:0}.mapboxgl-ctrl-top-right{top:0;right:0}.mapboxgl-ctrl-bottom-left{bottom:0;left:0}.mapboxgl-ctrl-bottom-right{right:0;bottom:0}.mapboxgl-ctrl{clear:both;pointer-events:auto;transform:translate(0)}.mapboxgl-ctrl-top-left .mapboxgl-ctrl{margin:10px 0 0 10px;float:left}.mapboxgl-ctrl-top-right .mapboxgl-ctrl{margin:10px 10px 0 0;float:right}.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl{margin:0 0 10px 10px;float:left}.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl{margin:0 10px 10px 0;float:right}.mapboxgl-ctrl-group{border-radius:4px;background:#fff}.mapboxgl-ctrl-group:not(:empty){-moz-box-shadow:0 0 2px rgba(0,0,0,.1);-webkit-box-shadow:0 0 2px rgba(0,0,0,.1);box-shadow:0 0 0 2px rgba(0,0,0,.1)}@media (-ms-high-contrast:active){.mapboxgl-ctrl-group:not(:empty){box-shadow:0 0 0 2px ButtonText}}.mapboxgl-ctrl-group button{width:29px;height:29px;display:block;padding:0;outline:none;border:0;box-sizing:border-box;background-color:transparent;cursor:pointer}.mapboxgl-ctrl-group button+button{border-top:1px solid #ddd}.mapboxgl-ctrl button .mapboxgl-ctrl-icon{display:block;width:100%;height:100%;background-repeat:no-repeat;background-position:50%}@media (-ms-high-contrast:active){.mapboxgl-ctrl-icon{background-color:transparent}.mapboxgl-ctrl-group button+button{border-top:1px solid ButtonText}}.mapboxgl-ctrl button::-moz-focus-inner{border:0;padding:0}.mapboxgl-ctrl-group button:focus{box-shadow:0 0 2px 2px #0096ff}.mapboxgl-ctrl button:disabled{cursor:not-allowed}.mapboxgl-ctrl button:disabled .mapboxgl-ctrl-icon{opacity:.25}.mapboxgl-ctrl button:not(:disabled):hover{background-color:rgba(0,0,0,.05)}.mapboxgl-ctrl-group button:focus:focus-visible{box-shadow:0 0 2px 2px #0096ff}.mapboxgl-ctrl-group button:focus:not(:focus-visible){box-shadow:none}.mapboxgl-ctrl-group button:focus:first-child{border-radius:4px 4px 0 0}.mapboxgl-ctrl-group button:focus:last-child{border-radius:0 0 4px 4px}.mapboxgl-ctrl-group button:focus:only-child{border-radius:inherit}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E\")}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E\")}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E\")}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23999'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23aaa'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='M14 5l1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting .mapboxgl-ctrl-icon{-webkit-animation:mapboxgl-spin 2s linear infinite;-moz-animation:mapboxgl-spin 2s infinite linear;-o-animation:mapboxgl-spin 2s infinite linear;-ms-animation:mapboxgl-spin 2s infinite linear;animation:mapboxgl-spin 2s linear infinite}@media (-ms-high-contrast:active){.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23999'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='M14 5l1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23666'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='M14 5l1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E\")}}@-webkit-keyframes mapboxgl-spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@-moz-keyframes mapboxgl-spin{0%{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(1turn)}}@-o-keyframes mapboxgl-spin{0%{-o-transform:rotate(0deg)}to{-o-transform:rotate(1turn)}}@-ms-keyframes mapboxgl-spin{0%{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(1turn)}}@keyframes mapboxgl-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}a.mapboxgl-ctrl-logo{width:88px;height:23px;margin:0 0 -4px -4px;display:block;background-repeat:no-repeat;cursor:pointer;overflow:hidden;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E%3Cdefs%3E%3Cpath id='a' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E%3Cpath id='b' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E%3C/defs%3E%3Cmask id='c'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3Cg opacity='.3' stroke='%23000' stroke-width='3'%3E%3Ccircle mask='url(%23c)' cx='11.5' cy='11.5' r='9.25'/%3E%3Cuse xlink:href='%23b' mask='url(%23c)'/%3E%3C/g%3E%3Cg opacity='.9' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/g%3E%3C/svg%3E\")}a.mapboxgl-ctrl-logo.mapboxgl-compact{width:23px}@media (-ms-high-contrast:active){a.mapboxgl-ctrl-logo{background-color:transparent;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E%3Cdefs%3E%3Cpath id='a' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E%3Cpath id='b' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E%3C/defs%3E%3Cmask id='c'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3Cg stroke='%23000' stroke-width='3'%3E%3Ccircle mask='url(%23c)' cx='11.5' cy='11.5' r='9.25'/%3E%3Cuse xlink:href='%23b' mask='url(%23c)'/%3E%3C/g%3E%3Cg fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/g%3E%3C/svg%3E\")}}@media (-ms-high-contrast:black-on-white){a.mapboxgl-ctrl-logo{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='88' height='23' viewBox='0 0 88 23' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill-rule='evenodd'%3E%3Cdefs%3E%3Cpath id='a' d='M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z'/%3E%3Cpath id='b' d='M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z'/%3E%3C/defs%3E%3Cmask id='c'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3Cg stroke='%23fff' stroke-width='3' fill='%23fff'%3E%3Ccircle mask='url(%23c)' cx='11.5' cy='11.5' r='9.25'/%3E%3Cuse xlink:href='%23b' mask='url(%23c)'/%3E%3C/g%3E%3Cuse xlink:href='%23a'/%3E%3Cuse xlink:href='%23b'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl.mapboxgl-ctrl-attrib{padding:0 5px;background-color:hsla(0,0%,100%,.5);margin:0}@media screen{.mapboxgl-ctrl-attrib.mapboxgl-compact{min-height:20px;padding:0;margin:10px;position:relative;background-color:#fff;border-radius:3px 12px 12px 3px}.mapboxgl-ctrl-attrib.mapboxgl-compact:hover{padding:2px 24px 2px 4px;visibility:visible;margin-top:6px}.mapboxgl-ctrl-bottom-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:hover,.mapboxgl-ctrl-top-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:hover{padding:2px 4px 2px 24px;border-radius:12px 3px 3px 12px}.mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-inner{display:none}.mapboxgl-ctrl-attrib.mapboxgl-compact:hover .mapboxgl-ctrl-attrib-inner{display:block}.mapboxgl-ctrl-attrib.mapboxgl-compact:after{content:\"\";cursor:pointer;position:absolute;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1012 0 6 6 0 10-12 0m5-3a1 1 0 102 0 1 1 0 10-2 0m0 3a1 1 0 112 0v3a1 1 0 11-2 0'/%3E%3C/svg%3E\");background-color:hsla(0,0%,100%,.5);width:24px;height:24px;box-sizing:border-box;border-radius:12px}.mapboxgl-ctrl-bottom-right>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{bottom:0;right:0}.mapboxgl-ctrl-top-right>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{top:0;right:0}.mapboxgl-ctrl-top-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{top:0;left:0}.mapboxgl-ctrl-bottom-left>.mapboxgl-ctrl-attrib.mapboxgl-compact:after{bottom:0;left:0}}@media screen and (-ms-high-contrast:active){.mapboxgl-ctrl-attrib.mapboxgl-compact:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' fill='%23fff'%3E%3Cpath d='M4 10a6 6 0 1012 0 6 6 0 10-12 0m5-3a1 1 0 102 0 1 1 0 10-2 0m0 3a1 1 0 112 0v3a1 1 0 11-2 0'/%3E%3C/svg%3E\")}}@media screen and (-ms-high-contrast:black-on-white){.mapboxgl-ctrl-attrib.mapboxgl-compact:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1012 0 6 6 0 10-12 0m5-3a1 1 0 102 0 1 1 0 10-2 0m0 3a1 1 0 112 0v3a1 1 0 11-2 0'/%3E%3C/svg%3E\")}}.mapboxgl-ctrl-attrib a{color:rgba(0,0,0,.75);text-decoration:none}.mapboxgl-ctrl-attrib a:hover{color:inherit;text-decoration:underline}.mapboxgl-ctrl-attrib .mapbox-improve-map{font-weight:700;margin-left:2px}.mapboxgl-attrib-empty{display:none}.mapboxgl-ctrl-scale{background-color:hsla(0,0%,100%,.75);font-size:10px;border:2px solid #333;border-top:#333;padding:0 5px;color:#333;box-sizing:border-box}.mapboxgl-popup{position:absolute;top:0;left:0;display:-webkit-flex;display:flex;will-change:transform;pointer-events:none}.mapboxgl-popup-anchor-top,.mapboxgl-popup-anchor-top-left,.mapboxgl-popup-anchor-top-right{-webkit-flex-direction:column;flex-direction:column}.mapboxgl-popup-anchor-bottom,.mapboxgl-popup-anchor-bottom-left,.mapboxgl-popup-anchor-bottom-right{-webkit-flex-direction:column-reverse;flex-direction:column-reverse}.mapboxgl-popup-anchor-left{-webkit-flex-direction:row;flex-direction:row}.mapboxgl-popup-anchor-right{-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.mapboxgl-popup-tip{width:0;height:0;border:10px solid transparent;z-index:1}.mapboxgl-popup-anchor-top .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-top:none;border-bottom-color:#fff}.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip{-webkit-align-self:flex-start;align-self:flex-start;border-top:none;border-left:none;border-bottom-color:#fff}.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip{-webkit-align-self:flex-end;align-self:flex-end;border-top:none;border-right:none;border-bottom-color:#fff}.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-bottom:none;border-top-color:#fff}.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip{-webkit-align-self:flex-start;align-self:flex-start;border-bottom:none;border-left:none;border-top-color:#fff}.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip{-webkit-align-self:flex-end;align-self:flex-end;border-bottom:none;border-right:none;border-top-color:#fff}.mapboxgl-popup-anchor-left .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-left:none;border-right-color:#fff}.mapboxgl-popup-anchor-right .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-right:none;border-left-color:#fff}.mapboxgl-popup-close-button{position:absolute;right:0;top:0;border:0;border-radius:0 3px 0 0;cursor:pointer;background-color:transparent}.mapboxgl-popup-close-button:hover{background-color:rgba(0,0,0,.05)}.mapboxgl-popup-content{position:relative;background:#fff;border-radius:3px;box-shadow:0 1px 2px rgba(0,0,0,.1);padding:10px 10px 15px;pointer-events:auto}.mapboxgl-popup-anchor-top-left .mapboxgl-popup-content{border-top-left-radius:0}.mapboxgl-popup-anchor-top-right .mapboxgl-popup-content{border-top-right-radius:0}.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content{border-bottom-left-radius:0}.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content{border-bottom-right-radius:0}.mapboxgl-popup-track-pointer{display:none}.mapboxgl-popup-track-pointer *{pointer-events:none;user-select:none}.mapboxgl-map:hover .mapboxgl-popup-track-pointer{display:flex}.mapboxgl-map:active .mapboxgl-popup-track-pointer{display:none}.mapboxgl-marker{position:absolute;top:0;left:0;will-change:transform}.mapboxgl-user-location-dot,.mapboxgl-user-location-dot:before{background-color:#1da1f2;width:15px;height:15px;border-radius:50%}.mapboxgl-user-location-dot:before{content:\"\";position:absolute;-webkit-animation:mapboxgl-user-location-dot-pulse 2s infinite;-moz-animation:mapboxgl-user-location-dot-pulse 2s infinite;-ms-animation:mapboxgl-user-location-dot-pulse 2s infinite;animation:mapboxgl-user-location-dot-pulse 2s infinite}.mapboxgl-user-location-dot:after{border-radius:50%;border:2px solid #fff;content:\"\";height:19px;left:-2px;position:absolute;top:-2px;width:19px;box-sizing:border-box;box-shadow:0 0 3px rgba(0,0,0,.35)}@-webkit-keyframes mapboxgl-user-location-dot-pulse{0%{-webkit-transform:scale(1);opacity:1}70%{-webkit-transform:scale(3);opacity:0}to{-webkit-transform:scale(1);opacity:0}}@-ms-keyframes mapboxgl-user-location-dot-pulse{0%{-ms-transform:scale(1);opacity:1}70%{-ms-transform:scale(3);opacity:0}to{-ms-transform:scale(1);opacity:0}}@keyframes mapboxgl-user-location-dot-pulse{0%{transform:scale(1);opacity:1}70%{transform:scale(3);opacity:0}to{transform:scale(1);opacity:0}}.mapboxgl-user-location-dot-stale{background-color:#aaa}.mapboxgl-user-location-dot-stale:after{display:none}.mapboxgl-user-location-accuracy-circle{background-color:rgba(29,161,242,.2);width:1px;height:1px;border-radius:100%}.mapboxgl-crosshair,.mapboxgl-crosshair .mapboxgl-interactive,.mapboxgl-crosshair .mapboxgl-interactive:active{cursor:crosshair}.mapboxgl-boxzoom{position:absolute;top:0;left:0;width:0;height:0;background:#fff;border:2px dotted #202020;opacity:.5}@media print{.mapbox-improve-map{display:none}}.mapboxgl-ctrl-infobox {\n  font-family: \"Palanquin\";\n  font-size: 1.1em;\n}.mapboxgl-ctrl-infobox h1,\n.mapboxgl-ctrl-infobox h2,\n.mapboxgl-ctrl-infobox h3,\n.mapboxgl-ctrl-infobox h4,\n.mapboxgl-ctrl-infobox h5,\n.mapboxgl-ctrl-infobox h6 {\n  font-family: \"Barlow Condensed\";\n}.mapboxgl-ctrl-infobox h1:not(:first-child),\n.mapboxgl-ctrl-infobox h2:not(:first-child),\n.mapboxgl-ctrl-infobox h3:not(:first-child),\n.mapboxgl-ctrl-infobox h4:not(:first-child),\n.mapboxgl-ctrl-infobox h5:not(:first-child),\n.mapboxgl-ctrl-infobox h6:not(:first-child) {\n  margin: 0.35em 0 0.35em 0;\n}.mapboxgl-ctrl-infobox h1:first-child,\n.mapboxgl-ctrl-infobox h2:first-child,\n.mapboxgl-ctrl-infobox h3:first-child,\n.mapboxgl-ctrl-infobox h4:first-child,\n.mapboxgl-ctrl-infobox h5:first-child,\n.mapboxgl-ctrl-infobox h6:first-child {\n  margin: 0 0 0.35em 0;\n}.mapboxgl-ctrl-infobox p {\n  line-height: 1.2;\n}.mapboxgl-ctrl-infobox p:not(:last-child) {\n  margin: 0 0 0.25em 0;\n}.mapboxgl-ctrl-infobox p:last-child {\n  margin: 0;\n}.mapboxgl-ctrl-infobox .icon > svg:hover {\n  border-radius: 4px;\n  cursor: pointer;\n  background-color: #eee;\n}.mapboxgl-ctrl-infobox .symbol {\n  margin-right: 8px;\n}.mapboxgl-ctrl-infobox .symbol .symbol-icon {\n  display: inline-block;\n  vertical-align: middle;\n  height: 18px;\n}.mapboxgl-ctrl-infobox ul {\n  padding-left: 1em;\n  margin: 0;\n}@font-face {\n  font-family: \"Palanquin\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Palanquin Regular\"), local(\"Palanquin-Regular\"), url(data:application/font-woff;charset=utf-8;base64,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) format(\"woff2\");\n}.font-palanquin {\n  font-family: \"Palanquin\";\n}@font-face {\n  font-family: \"Barlow Condensed\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Barlow Condensed Regular\"), local(\"BarlowCondensed-Regular\"), url(data:application/font-woff;charset=utf-8;base64,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) format(\"woff2\");\n}.font-barlow {\n  font-family: \"Barlow Condensed\";\n}.mapboxgl-ctrl-attrib.mapboxgl-compact {\n  text-align: center;\n}.mapboxgl-ctrl-attrib.mapboxgl-compact::after {\n  background-image: url(./style/heart.png) !important;\n}.mapboxgl-popup-close-button {\n  z-index: 90;\n  font-size: 1em;\n  width: 24px;\n  height: 26px;\n  background-color: rgba(255, 255, 255, 0.4);\n}.mapboxgl-popup-close-button:hover {\n  background-color: rgba(255, 255, 255, 0.9) !important;\n}.mapboxgl-popup-content {\n  padding: 10px !important;\n}";
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
