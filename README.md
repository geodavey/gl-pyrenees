# gl-pyrenees | [Live Demo](https://gl-pyrenees.geodavey.us)
Interactive hiking map of the Pyrenees mountain range using OSM data, with live backpacker updates and tracking

### Style Development
```
git clone https://github.com/geoDavey/gl-pyrenees.git
cd gl-pyrenees && npm run develop
```

### React Component
```
npm install --save @geodavey/gl-pyrenees
```
```js
import PyreneesMap from "@geodavey/gl-pyrenees";

// array of GeoJSON LineStrings
let tracks = [
  {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [0, 0],
        [0, 0],
      ],
    },
  },
];

// array of GeoJSON Points with specific properties
let updates = [
  {
    type: "Feature",
    properties: {
      photo: "/url/to/update/photo.jpg",
      caption: "Photo Caption",
      date: "2020-05-02T14:08:52.664Z",
    },
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
  },
];

<PyreneesMap
  data={{
    tracks: tracks,
    updates: updates,
    onLoad: () => {}
  }}
/>

```