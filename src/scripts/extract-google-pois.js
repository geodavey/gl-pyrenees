const turf = require("@turf/turf");
const fs = require("fs");

let input = process.argv[2];
let output = process.argv[3];

let getJSON = (path) => JSON.parse(fs.readFileSync(path));
let writeJSON = (path, json) => fs.writeFileSync(path, JSON.stringify(json));

// if output doesn't exist, create blank geojson
if (!fs.existsSync(output))
  fs.writeFileSync(output, JSON.stringify(turf.featureCollection([])));

let footprint = getJSON("../data/pyr/footprint.geojson").features[0];
let inputJSON = getJSON(input);
let existingJSON = getJSON(output);

// array of ids already existing
let existingIds = existingJSON.features.map((feat) => {
  return feat.properties.id;
});

inputJSON.features = inputJSON.features
  .filter((feat) => {
    // only get places inside pyr footprint
    // and that have a cid= (are a business of some sort)
    // and that don't already exist in output dataset
    let f_id = parseInt(feat.properties["Google Maps URL"].split("?cid=")[1]);
    return (
      feat.properties["Google Maps URL"].indexOf("?cid=") !== -1 &&
      turf.booleanPointInPolygon(feat.geometry, footprint) &&
      !existingIds.includes(f_id)
    );
  })
  .map((feat) => {
    // extract important info
    return {
      type: feat.type,
      geometry: feat.geometry,
      properties: {
        id: parseInt(feat.properties["Google Maps URL"].split("?cid=")[1]),
        type: "", // to be filled in manually
        place: "", // manual
        name: feat.properties["Location"]["Business Name"],
        address: feat.properties["Location"]["Address"],
      },
    };
  });

// combined dataset
let outputJSON = turf.featureCollection([
  ...inputJSON.features,
  ...existingJSON.features,
]);

writeJSON(output, outputJSON);
console.log(
  `Added ${inputJSON.features.length} features ( ${outputJSON.features.length} total )`
);
