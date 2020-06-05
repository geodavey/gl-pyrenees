var version = 8;
var name = "Topo";
var metadata = {
	"mapbox:type": "template",
	"openmaptiles:version": "3.x"
};
var sources = {
	openmaptiles: {
		type: "vector",
		url: "https://api.maptiler.com/tiles/v3/tiles.json?key=CtAoXvIMV1y0OjjSbPRb"
	},
	contours: {
		type: "vector",
		url: "https://api.maptiler.com/tiles/contours/tiles.json?key=CtAoXvIMV1y0OjjSbPRb"
	},
	landcover: {
		type: "vector",
		url: "https://api.maptiler.com/tiles/landcover/tiles.json?key=CtAoXvIMV1y0OjjSbPRb"
	},
	"terrain-rgb": {
		type: "raster-dem",
		url: "https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=CtAoXvIMV1y0OjjSbPRb"
	},
	pyr: {
		type: "vector",
		tiles: [
			"http://localhost:8080/data/pyr/{z}/{x}/{y}.pbf"
		],
		minZoom: 0,
		maxZoom: 14,
		maxzoom: 13
	},
	gdv_tracks: {
		type: "geojson",
		data: "http://localhost:8080/data/test/gdv_tracks.geojson"
	},
	gdv_waypoints: {
		type: "geojson",
		data: "http://localhost:8080/data/test/gdv_waypoints.geojson"
	},
	gdv_updates: {
		type: "geojson",
		data: "http://localhost:8080/data/test/gdv_updates.geojson"
	}
};
var sprite = "https://api.maptiler.com/maps/topo/sprite";
var glyphs = "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=CtAoXvIMV1y0OjjSbPRb";
var layers = [
	{
		id: "background",
		type: "background",
		minzoom: 0,
		layout: {
			visibility: "visible"
		},
		paint: {
			"background-color": "rgba(232, 230, 223, 1)"
		}
	},
	{
		id: "landcover_grass",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landcover",
		minzoom: 10,
		maxzoom: 22,
		filter: [
			"any",
			[
				"==",
				"subclass",
				"park"
			],
			[
				"==",
				"subclass",
				"village_green"
			],
			[
				"==",
				"class",
				"grass"
			],
			[
				"==",
				"class",
				"farmland"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-antialias": false,
			"fill-color": "rgba(222, 226, 191, 1)",
			"fill-opacity": 0.6
		}
	},
	{
		id: "landcover_wood",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landcover",
		minzoom: 10,
		maxzoom: 22,
		filter: [
			"all",
			[
				"==",
				"class",
				"wood"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-antialias": true,
			"fill-color": "rgba(191, 202, 155, 1)",
			"fill-opacity": 1,
			"fill-outline-color": "rgba(191, 202, 155, 1)",
			"fill-translate": [
				1,
				1
			]
		}
	},
	{
		id: "landcover_ice",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landcover",
		minzoom: 10,
		maxzoom: 22,
		filter: [
			"all",
			[
				"==",
				"class",
				"ice"
			]
		],
		layout: {
			visibility: "none"
		},
		paint: {
			"fill-antialias": false,
			"fill-color": "rgba(255, 255, 255, 1)",
			"fill-opacity": 1
		}
	},
	{
		id: "landcover_sand",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landcover",
		filter: [
			"all",
			[
				"in",
				"class",
				"sand"
			]
		],
		paint: {
			"fill-antialias": false,
			"fill-color": "rgba(232, 214, 38, 1)",
			"fill-opacity": 0.3
		},
		layout: {
			visibility: "visible"
		},
		maxzoom: 22
	},
	{
		id: "globallandcover_grass",
		type: "fill",
		source: "landcover",
		"source-layer": "globallandcover",
		minzoom: 0,
		maxzoom: 11,
		filter: [
			"all",
			[
				"==",
				"class",
				"grass"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(222, 226, 191, 1)",
			"fill-opacity": {
				stops: [
					[
						8,
						0.6
					],
					[
						9,
						0.2
					]
				]
			}
		}
	},
	{
		id: "globallandcover_scrub",
		type: "fill",
		source: "landcover",
		"source-layer": "globallandcover",
		minzoom: 0,
		maxzoom: 11,
		filter: [
			"all",
			[
				"==",
				"class",
				"scrub"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(202, 214, 166, 1)",
			"fill-opacity": 1
		}
	},
	{
		id: "globallandcover_tree",
		type: "fill",
		source: "landcover",
		"source-layer": "globallandcover",
		minzoom: 0,
		maxzoom: 11,
		filter: [
			"all",
			[
				"==",
				"class",
				"tree"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(191, 202, 155, 1)",
			"fill-opacity": 1
		}
	},
	{
		id: "globallandcover_forest",
		type: "fill",
		source: "landcover",
		"source-layer": "globallandcover",
		minzoom: 0,
		maxzoom: 11,
		filter: [
			"all",
			[
				"==",
				"class",
				"forest"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(191, 202, 155, 1)",
			"fill-opacity": 1
		}
	},
	{
		id: "globallandcover_ice",
		type: "fill",
		source: "landcover",
		"source-layer": "globallandcover",
		minzoom: 0,
		maxzoom: 11,
		filter: [
			"all",
			[
				"==",
				"class",
				"snow"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(255, 255, 255, 1)",
			"fill-opacity": 1
		}
	},
	{
		id: "landuse-residential",
		type: "fill",
		source: "openmaptiles",
		"source-layer": "landuse",
		maxzoom: 16,
		filter: [
			"all",
			[
				"==",
				"$type",
				"Polygon"
			],
			[
				"in",
				"class",
				"residential",
				"suburb",
				"neighbourhood"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(191, 186, 171, 1)",
			"fill-opacity": {
				stops: [
					[
						8,
						0.4
					],
					[
						9,
						0.1
					],
					[
						9.1,
						0.4
					]
				]
			}
		}
	},
	{
		id: "landuse_industrial_school",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landuse",
		minzoom: 10,
		maxzoom: 22,
		filter: [
			"all",
			[
				"in",
				"class",
				"industrial",
				"commercial",
				"retail",
				"stadium",
				"college",
				"university",
				"school",
				"garages",
				"dam"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": {
				stops: [
					[
						12,
						"rgba(179, 179, 179, 1)"
					],
					[
						16,
						"rgba(232, 230, 223, 1)"
					]
				]
			},
			"fill-opacity": 0.5
		}
	},
	{
		id: "landuse_cemetery",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landuse",
		minzoom: 10,
		maxzoom: 22,
		filter: [
			"==",
			"class",
			"cemetery"
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(175, 169, 157, 1)",
			"fill-opacity": 0.5
		}
	},
	{
		id: "landuse_hospital",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "landuse",
		minzoom: 10,
		maxzoom: 22,
		filter: [
			"==",
			"class",
			"hospital"
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(236, 224, 231, 1)",
			"fill-opacity": 0.5
		}
	},
	{
		id: "hillshade",
		type: "hillshade",
		source: "terrain-rgb",
		layout: {
			visibility: "visible"
		},
		paint: {
			"hillshade-exaggeration": {
				stops: [
					[
						6,
						0.7
					],
					[
						10,
						0.9
					]
				]
			},
			"hillshade-shadow-color": "rgba(49, 49, 49, 1)"
		},
		minzoom: 0
	},
	{
		id: "contour_index",
		type: "line",
		source: "contours",
		"source-layer": "contour",
		filter: [
			"all",
			[
				">",
				"height",
				0
			],
			[
				"in",
				"nth_line",
				10,
				5
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(181, 129, 100, 1)",
			"line-opacity": {
				stops: [
					[
						7,
						0.2
					],
					[
						10,
						0.6
					]
				]
			},
			"line-width": 1.3
		},
		minzoom: 10.5,
		maxzoom: 24
	},
	{
		id: "contour",
		type: "line",
		source: "contours",
		"source-layer": "contour",
		filter: [
			"all",
			[
				"!in",
				"nth_line",
				10,
				5
			],
			[
				">",
				"height",
				0
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(181, 129, 100, 1)",
			"line-opacity": 0.5,
			"line-width": 0.8
		},
		minzoom: 10.5
	},
	{
		id: "contour_label",
		type: "symbol",
		metadata: {
		},
		source: "contours",
		"source-layer": "contour",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"in",
				"nth_line",
				10,
				5
			],
			[
				">",
				"height",
				0
			]
		],
		layout: {
			"symbol-avoid-edges": true,
			"symbol-placement": "line",
			"text-allow-overlap": false,
			"text-field": "{height}",
			"text-font": [
				"Noto Sans Regular"
			],
			"text-ignore-placement": false,
			"text-padding": 10,
			"text-rotation-alignment": "map",
			"text-size": {
				base: 1,
				stops: [
					[
						15,
						9.5
					],
					[
						20,
						12
					]
				]
			},
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(181, 129, 100, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(232, 230, 223, 1)",
			"text-halo-width": 1
		},
		minzoom: 10.5,
		maxzoom: 24
	},
	{
		id: "waterway_tunnel",
		type: "line",
		source: "openmaptiles",
		"source-layer": "waterway",
		minzoom: 14,
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-cap": "round"
		},
		paint: {
			"line-color": "rgba(103, 166, 196, 1)",
			"line-dasharray": [
				2,
				4
			],
			"line-width": {
				base: 1.3,
				stops: [
					[
						13,
						0.5
					],
					[
						20,
						6
					]
				]
			}
		}
	},
	{
		id: "waterway_river",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "waterway",
		filter: [
			"all",
			[
				"==",
				"class",
				"river"
			],
			[
				"!=",
				"brunnel",
				"tunnel"
			],
			[
				"!=",
				"intermittent",
				1
			]
		],
		layout: {
			"line-cap": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": {
				stops: [
					[
						6,
						"rgba(103, 166, 196, 1)"
					],
					[
						8,
						"rgba(196, 229, 236, 1)"
					],
					[
						9,
						"rgba(103, 166, 196, 1)"
					]
				]
			},
			"line-width": {
				base: 1.2,
				stops: [
					[
						11,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "waterway_river_intermittent",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "waterway",
		filter: [
			"all",
			[
				"==",
				"class",
				"river"
			],
			[
				"!=",
				"brunnel",
				"tunnel"
			],
			[
				"==",
				"intermittent",
				1
			]
		],
		layout: {
			"line-cap": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": {
				stops: [
					[
						6,
						"rgba(103, 166, 196, 1)"
					],
					[
						8,
						"rgba(196, 229, 236, 1)"
					],
					[
						9,
						"rgba(103, 166, 196, 1)"
					]
				]
			},
			"line-dasharray": [
				2,
				1.6
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						11,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "waterway_other",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "waterway",
		filter: [
			"all",
			[
				"!=",
				"class",
				"river"
			],
			[
				"!=",
				"brunnel",
				"tunnel"
			],
			[
				"!=",
				"intermittent",
				1
			]
		],
		layout: {
			"line-cap": "butt",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(103, 166, 196, 1)",
			"line-width": {
				base: 1.3,
				stops: [
					[
						13,
						0.5
					],
					[
						20,
						12
					]
				]
			}
		}
	},
	{
		id: "waterway_other_intermittent",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "waterway",
		filter: [
			"all",
			[
				"!=",
				"class",
				"river"
			],
			[
				"!=",
				"brunnel",
				"tunnel"
			],
			[
				"==",
				"intermittent",
				1
			]
		],
		layout: {
			"line-cap": "butt",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(103, 166, 196, 1)",
			"line-dasharray": [
				4,
				3
			],
			"line-width": {
				base: 1.3,
				stops: [
					[
						13,
						0.5
					],
					[
						20,
						12
					]
				]
			}
		}
	},
	{
		id: "water",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "water",
		filter: [
			"all",
			[
				"!=",
				"intermittent",
				1
			],
			[
				"!=",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(103, 166, 196, 1)"
		}
	},
	{
		id: "water_intermittent",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "water",
		filter: [
			"all",
			[
				"==",
				"intermittent",
				1
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-color": "rgba(163, 201, 220, 1)",
			"fill-opacity": 1
		}
	},
	{
		id: "aeroway_fill",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "aeroway",
		minzoom: 11,
		filter: [
			"==",
			"$type",
			"Polygon"
		],
		paint: {
			"fill-color": "rgba(229, 228, 224, 1)",
			"fill-opacity": 0.7
		}
	},
	{
		id: "aeroway_runway",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "aeroway",
		minzoom: 11,
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"==",
				"class",
				"runway"
			]
		],
		paint: {
			"line-color": "#f0ede9",
			"line-width": {
				base: 1.2,
				stops: [
					[
						11,
						3
					],
					[
						20,
						16
					]
				]
			}
		}
	},
	{
		id: "aeroway_taxiway",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "aeroway",
		minzoom: 11,
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"==",
				"class",
				"taxiway"
			]
		],
		paint: {
			"line-color": "#f0ede9",
			"line-width": {
				base: 1.2,
				stops: [
					[
						11,
						0.5
					],
					[
						20,
						6
					]
				]
			}
		}
	},
	{
		id: "ferry",
		type: "line",
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"in",
				"class",
				"ferry"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(47, 136, 183, 1)",
			"line-dasharray": [
				2,
				2
			],
			"line-width": 1.1
		}
	},
	{
		id: "hr_gr",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		paint: {
			"line-width": 2,
			"line-color": [
				"match",
				[
					"get",
					"ref"
				],
				"HRP",
				"#fbb03b",
				"GR 11",
				"#223b53",
				"GR11",
				"#223b53",
				"GR 10",
				"#e55e5e",
				"#000000"
			]
		},
		minzoom: 0,
		filter: [
			"all",
			[
				"in",
				"ref",
				"GR 11",
				"GR10",
				"GR 10"
			]
		],
		layout: {
			visibility: "none"
		}
	},
	{
		id: "hr_minor-casing",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		minzoom: 10,
		maxzoom: 24,
		filter: [
			"all"
		],
		paint: {
			"line-color": "rgba(255, 255, 255, 1)",
			"line-blur": 0,
			"line-width": {
				stops: [
					[
						6,
						2
					],
					[
						10,
						2.5
					]
				]
			}
		},
		layout: {
			visibility: "visible"
		}
	},
	{
		id: "hr_minor",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		minzoom: 10,
		maxzoom: 24,
		filter: [
			"all"
		],
		paint: {
			"line-color": "rgba(234, 118, 24, 1)",
			"line-blur": 0,
			"line-width": {
				stops: [
					[
						6,
						0.6
					],
					[
						10,
						1.2
					]
				]
			},
			"line-dasharray": [
				3,
				1
			]
		},
		layout: {
			visibility: "visible"
		}
	},
	{
		id: "hr_major-casing",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		minzoom: 7,
		maxzoom: 24,
		filter: [
			"all",
			[
				"in",
				"network",
				"iwn",
				"nwn"
			]
		],
		paint: {
			"line-color": "rgba(255, 255, 255, 1)",
			"line-blur": 0,
			"line-width": {
				stops: [
					[
						6,
						2
					],
					[
						10,
						3
					]
				]
			}
		},
		layout: {
			visibility: "visible"
		}
	},
	{
		id: "hr_major",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		minzoom: 7,
		maxzoom: 24,
		filter: [
			"all",
			[
				"in",
				"network",
				"iwn",
				"nwn"
			]
		],
		paint: {
			"line-color": "rgba(234, 118, 24, 1)",
			"line-blur": 0,
			"line-width": {
				stops: [
					[
						6,
						0.6
					],
					[
						10,
						1.7
					]
				]
			}
		}
	},
	{
		id: "hr_hrp-casing",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		filter: [
			"all",
			[
				"in",
				"ref",
				"HRP"
			]
		],
		paint: {
			"line-width": {
				stops: [
					[
						6,
						2.6
					],
					[
						10,
						3.6
					]
				]
			},
			"line-color": "rgba(255,255,255,1)",
			"line-translate": [
				0,
				0
			]
		},
		minzoom: 0
	},
	{
		id: "hr_hrp",
		type: "line",
		source: "pyr",
		"source-layer": "hiking_routes",
		filter: [
			"all",
			[
				"in",
				"ref",
				"HRP"
			]
		],
		paint: {
			"line-width": {
				stops: [
					[
						6,
						0.9
					],
					[
						10,
						1.9
					]
				]
			},
			"line-color": "rgba(255, 0, 0, 1)",
			"line-translate": [
				0,
				0
			]
		},
		minzoom: 0
	},
	{
		id: "tunnel_motorway_link_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"ramp",
				1
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-dasharray": [
				0.5,
				0.25
			],
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						1
					],
					[
						13,
						3
					],
					[
						14,
						4
					],
					[
						20,
						15
					]
				]
			}
		}
	},
	{
		id: "tunnel_service_track_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"service",
				"track"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#cfcdca",
			"line-dasharray": [
				0.5,
				0.25
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						15,
						1
					],
					[
						16,
						4
					],
					[
						20,
						11
					]
				]
			}
		}
	},
	{
		id: "tunnel_link_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"ramp",
				"1"
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						1
					],
					[
						13,
						3
					],
					[
						14,
						4
					],
					[
						20,
						15
					]
				]
			}
		}
	},
	{
		id: "tunnel_street_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"street",
				"street_limited"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#cfcdca",
			"line-opacity": {
				stops: [
					[
						12,
						0
					],
					[
						12.5,
						1
					]
				]
			},
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						0.5
					],
					[
						13,
						1
					],
					[
						14,
						4
					],
					[
						20,
						15
					]
				]
			}
		}
	},
	{
		id: "tunnel_secondary_tertiary_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"secondary",
				"tertiary"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						8,
						1.5
					],
					[
						20,
						21
					]
				]
			}
		}
	},
	{
		id: "tunnel_trunk_primary_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"primary",
				"trunk"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0.4
					],
					[
						6,
						0.7
					],
					[
						7,
						1.75
					],
					[
						20,
						22
					]
				]
			}
		}
	},
	{
		id: "tunnel_motorway_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-dasharray": [
				0.5,
				0.25
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0.4
					],
					[
						6,
						0.7
					],
					[
						7,
						1.75
					],
					[
						20,
						22
					]
				]
			}
		}
	},
	{
		id: "tunnel_path_pedestrian",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"path",
				"pedestrian"
			]
		],
		paint: {
			"line-color": "hsl(0, 0%, 100%)",
			"line-dasharray": [
				1,
				0.75
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						14,
						0.5
					],
					[
						20,
						10
					]
				]
			}
		}
	},
	{
		id: "tunnel_motorway_link",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway_link"
			],
			[
				"==",
				"ramp",
				1
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fc8",
			"line-width": {
				base: 1.2,
				stops: [
					[
						12.5,
						0
					],
					[
						13,
						1.5
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "tunnel_service_track",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"service",
				"track"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15.5,
						0
					],
					[
						16,
						2
					],
					[
						20,
						7.5
					]
				]
			}
		}
	},
	{
		id: "tunnel_service_track_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"service_construction",
				"track_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						15.5,
						0
					],
					[
						16,
						2
					],
					[
						20,
						7.5
					]
				]
			}
		}
	},
	{
		id: "tunnel_link",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"ramp",
				"1"
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff4c6",
			"line-width": {
				base: 1.2,
				stops: [
					[
						12.5,
						0
					],
					[
						13,
						1.5
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "tunnel_minor",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"minor"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						13.5,
						0
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "tunnel_minor_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"minor_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						13.5,
						0
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "tunnel_secondary_tertiary",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"secondary",
				"tertiary"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff4c6",
			"line-width": {
				base: 1.2,
				stops: [
					[
						6.5,
						0
					],
					[
						7,
						0.5
					],
					[
						20,
						12
					]
				]
			}
		}
	},
	{
		id: "tunnel_secondary_tertiary_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"secondary_construction",
				"tertiary_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						6.5,
						0
					],
					[
						8,
						0.5
					],
					[
						20,
						13
					]
				]
			}
		}
	},
	{
		id: "tunnel_trunk_primary",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"primary",
				"trunk"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff4c6",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "tunnel_trunk_primary_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"primary_construction",
				"trunk_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff4c6",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "tunnel_motorway",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#ffdaa6",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "tunnel_motorway_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway_construction"
			],
			[
				"==",
				"brunnel",
				"tunnel"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#ffdaa6",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "tunnel_major_rail",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"in",
				"class",
				"rail"
			]
		],
		paint: {
			"line-color": "#bbb",
			"line-width": {
				base: 1.4,
				stops: [
					[
						14,
						0.4
					],
					[
						15,
						0.75
					],
					[
						20,
						2
					]
				]
			}
		}
	},
	{
		id: "tunnel_major_rail_hatching",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"tunnel"
			],
			[
				"==",
				"class",
				"rail"
			]
		],
		paint: {
			"line-color": "#bbb",
			"line-dasharray": [
				0.2,
				8
			],
			"line-width": {
				base: 1.4,
				stops: [
					[
						14.5,
						0
					],
					[
						15,
						3
					],
					[
						20,
						8
					]
				]
			}
		}
	},
	{
		id: "road_area_bridge",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"Polygon"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-antialias": true,
			"fill-color": "rgba(246, 241, 229, 0.6)"
		}
	},
	{
		id: "road_area_pier",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"Polygon"
			],
			[
				"==",
				"class",
				"pier"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-antialias": true,
			"fill-color": "rgba(232, 230, 223, 1)"
		}
	},
	{
		id: "road_pier",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"in",
				"class",
				"pier"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round"
		},
		paint: {
			"line-color": "rgba(232, 230, 223, 1)",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15,
						1
					],
					[
						17,
						4
					]
				]
			}
		}
	},
	{
		id: "road_area_pattern",
		type: "fill",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"Polygon"
			],
			[
				"!=",
				"brunnel",
				"bridge"
			],
			[
				"!in",
				"class",
				"bridge",
				"pier"
			]
		],
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-pattern": "pedestrian_polygon"
		}
	},
	{
		id: "road_motorway_link_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 12,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"ramp",
				1
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						1
					],
					[
						13,
						3
					],
					[
						14,
						4
					],
					[
						20,
						15
					]
				]
			}
		}
	},
	{
		id: "road_service_track_casing-1",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"track"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(165, 165, 165, 1)",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15,
						1.3
					],
					[
						16,
						4
					],
					[
						20,
						11
					]
				]
			}
		}
	},
	{
		id: "road_service_track_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"service"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(181, 178, 175, 1)",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15,
						1
					],
					[
						16,
						4
					],
					[
						20,
						11
					]
				]
			}
		}
	},
	{
		id: "road_link_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"ramp",
				1
			],
			[
				"!in",
				"class",
				"pedestrian",
				"path",
				"track",
				"service"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						1
					],
					[
						13,
						3
					],
					[
						14,
						6
					],
					[
						20,
						23
					]
				]
			}
		}
	},
	{
		id: "road_minor_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"minor"
			],
			[
				"!=",
				"ramp",
				"1"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(181, 178, 175, 1)",
			"line-opacity": {
				stops: [
					[
						12,
						0
					],
					[
						12.5,
						1
					]
				]
			},
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						0.5
					],
					[
						13,
						1
					],
					[
						14,
						4
					],
					[
						20,
						20
					]
				]
			}
		}
	},
	{
		id: "road_secondary_tertiary_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"secondary",
				"tertiary"
			],
			[
				"!=",
				"ramp",
				1
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "none"
		},
		paint: {
			"line-color": "#444",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						8,
						1.5
					],
					[
						20,
						7
					]
				]
			}
		},
		minzoom: 9.5,
		maxzoom: 24
	},
	{
		id: "road_path_pedestrian-casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"path",
				"pedestrian"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(255,255,255,1)",
			"line-width": {
				base: 1.2,
				stops: [
					[
						14,
						2.5
					],
					[
						20,
						9
					]
				]
			}
		}
	},
	{
		id: "road_path_pedestrian",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"path",
				"pedestrian"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(234, 118, 24, 1)",
			"line-dasharray": [
				3,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						14,
						1
					],
					[
						20,
						6
					]
				]
			}
		}
	},
	{
		id: "road_trunk_primary_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"primary",
				"trunk"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0.4
					],
					[
						6,
						0.7
					],
					[
						7,
						1.75
					],
					[
						20,
						12
					]
				]
			}
		},
		minzoom: 9.5,
		maxzoom: 24
	},
	{
		id: "road_motorway_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 9.5,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"motorway"
			],
			[
				"!=",
				"ramp",
				"1"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0.4
					],
					[
						6,
						0.7
					],
					[
						7,
						1.75
					],
					[
						20,
						22
					]
				]
			}
		},
		maxzoom: 24
	},
	{
		id: "road_minor",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"all",
				[
					"!in",
					"brunnel",
					"bridge",
					"tunnel"
				],
				[
					"in",
					"class",
					"minor"
				]
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						13.5,
						0
					],
					[
						14,
						2.5
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "road_minor_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"all",
				[
					"!in",
					"brunnel",
					"bridge",
					"tunnel"
				],
				[
					"in",
					"class",
					"minor_construction"
				]
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						13.5,
						0
					],
					[
						14,
						2.5
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "road_service_track",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"service",
				"track"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15.5,
						0
					],
					[
						16,
						2
					],
					[
						20,
						7.5
					]
				]
			}
		}
	},
	{
		id: "road_service_track_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"service_construction",
				"track_construction"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						15.5,
						0
					],
					[
						16,
						2
					],
					[
						20,
						7.5
					]
				]
			}
		}
	},
	{
		id: "road_link",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"ramp",
				1
			],
			[
				"!in",
				"class",
				"pedestrian",
				"path",
				"track",
				"service"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-width": {
				base: 1.2,
				stops: [
					[
						12.5,
						0
					],
					[
						13,
						1.5
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "road_motorway_link",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 12,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"ramp",
				1
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-width": {
				base: 1.2,
				stops: [
					[
						12.5,
						0
					],
					[
						13,
						1.5
					],
					[
						14,
						2.5
					],
					[
						20,
						19
					]
				]
			}
		}
	},
	{
		id: "road_secondary_tertiary",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"secondary",
				"tertiary"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-width": {
				base: 1.2,
				stops: [
					[
						6.5,
						0
					],
					[
						8,
						0.5
					],
					[
						20,
						9
					]
				]
			}
		},
		minzoom: 9.5,
		maxzoom: 24
	},
	{
		id: "road_secondary_tertiary_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"secondary_construction",
				"tertiary_construction"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						6.5,
						0
					],
					[
						8,
						0.5
					],
					[
						20,
						13
					]
				]
			}
		},
		minzoom: 9.5,
		maxzoom: 24
	},
	{
		id: "road_trunk_primary",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"in",
				"class",
				"primary",
				"trunk"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "none"
		},
		paint: {
			"line-color": "#000",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						10
					]
				]
			}
		},
		minzoom: 9.5
	},
	{
		id: "road_trunk_primary_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"!=",
				"ramp",
				1
			],
			[
				"in",
				"class",
				"primary_construction",
				"trunk_construction"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#000",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		},
		minzoom: 9.5,
		maxzoom: 24
	},
	{
		id: "road_motorway",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 9.5,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"motorway"
			],
			[
				"!=",
				"ramp",
				1
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": {
				base: 1,
				stops: [
					[
						5,
						"#000"
					],
					[
						6,
						"#000"
					]
				]
			},
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		},
		maxzoom: 24
	},
	{
		id: "road_motorway_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 9.5,
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"motorway_construction"
			],
			[
				"!=",
				"ramp",
				1
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": {
				base: 1,
				stops: [
					[
						5,
						"#000"
					],
					[
						6,
						"#000"
					]
				]
			},
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "road_major_rail",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"rail"
			]
		],
		paint: {
			"line-color": "#bbb",
			"line-width": {
				base: 1.4,
				stops: [
					[
						14,
						0.4
					],
					[
						15,
						0.75
					],
					[
						20,
						2
					]
				]
			}
		}
	},
	{
		id: "road_major_rail_hatching",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"!in",
				"brunnel",
				"bridge",
				"tunnel"
			],
			[
				"==",
				"class",
				"rail"
			]
		],
		paint: {
			"line-color": "#bbb",
			"line-dasharray": [
				0.2,
				8
			],
			"line-width": {
				base: 1.4,
				stops: [
					[
						14.5,
						0
					],
					[
						15,
						3
					],
					[
						20,
						8
					]
				]
			}
		}
	},
	{
		id: "building",
		type: "fill",
		source: "openmaptiles",
		"source-layer": "building",
		minzoom: 12,
		maxzoom: 24,
		layout: {
			visibility: "visible"
		},
		paint: {
			"fill-antialias": true,
			"fill-color": "rgba(202, 197, 189, 1)",
			"fill-outline-color": "rgba(190, 185, 176, 1)"
		}
	},
	{
		id: "building-3d",
		type: "fill-extrusion",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "building",
		minzoom: 14,
		layout: {
			visibility: "none"
		},
		paint: {
			"fill-extrusion-base": {
				property: "render_min_height",
				type: "identity"
			},
			"fill-extrusion-color": "rgba(171, 165, 156, 1)",
			"fill-extrusion-height": {
				property: "render_height",
				type: "identity"
			},
			"fill-extrusion-opacity": 0.5
		}
	},
	{
		id: "bridge_motorway_link_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway_link"
			],
			[
				"==",
				"ramp",
				1
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						1
					],
					[
						13,
						3
					],
					[
						14,
						4
					],
					[
						20,
						15
					]
				]
			}
		}
	},
	{
		id: "bridge_service_track_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"service",
				"track"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#cfcdca",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15,
						1
					],
					[
						16,
						4
					],
					[
						20,
						11
					]
				]
			}
		}
	},
	{
		id: "bridge_link_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"link"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						1
					],
					[
						13,
						3
					],
					[
						14,
						4
					],
					[
						20,
						15
					]
				]
			}
		}
	},
	{
		id: "bridge_street_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"street",
				"street_limited"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "hsl(36, 6%, 74%)",
			"line-opacity": {
				stops: [
					[
						12,
						0
					],
					[
						12.5,
						1
					]
				]
			},
			"line-width": {
				base: 1.2,
				stops: [
					[
						12,
						0.5
					],
					[
						13,
						1
					],
					[
						14,
						4
					],
					[
						20,
						25
					]
				]
			}
		}
	},
	{
		id: "bridge_path_pedestrian_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"path",
				"pedestrian"
			]
		],
		layout: {
			"line-join": "miter",
			visibility: "visible"
		},
		paint: {
			"line-color": "hsl(35, 6%, 80%)",
			"line-dasharray": [
				1,
				0
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						14,
						1.5
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_secondary_tertiary_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"secondary",
				"tertiary"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						8,
						1.5
					],
					[
						20,
						21
					]
				]
			}
		}
	},
	{
		id: "bridge_trunk_primary_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"primary",
				"trunk"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0.4
					],
					[
						6,
						0.7
					],
					[
						7,
						1.75
					],
					[
						20,
						22
					]
				]
			}
		}
	},
	{
		id: "bridge_motorway_casing",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#e9ac77",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0.4
					],
					[
						6,
						0.7
					],
					[
						7,
						1.75
					],
					[
						20,
						22
					]
				]
			}
		}
	},
	{
		id: "bridge_path_pedestrian",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"path",
				"pedestrian"
			]
		],
		paint: {
			"line-color": "hsl(0, 0%, 100%)",
			"line-dasharray": [
				1,
				0.3
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						14,
						0.5
					],
					[
						20,
						10
					]
				]
			}
		}
	},
	{
		id: "bridge_motorway_link",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway_link"
			],
			[
				"==",
				"ramp",
				1
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fc8",
			"line-width": {
				base: 1.2,
				stops: [
					[
						12.5,
						0
					],
					[
						13,
						1.5
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "bridge_service_track",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"service",
				"track"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff",
			"line-width": {
				base: 1.2,
				stops: [
					[
						15.5,
						0
					],
					[
						16,
						2
					],
					[
						20,
						7.5
					]
				]
			}
		}
	},
	{
		id: "bridge_service_track_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"service_construction",
				"track_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						15.5,
						0
					],
					[
						16,
						2
					],
					[
						20,
						7.5
					]
				]
			}
		}
	},
	{
		id: "bridge_link",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"link"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fea",
			"line-width": {
				base: 1.2,
				stops: [
					[
						12.5,
						0
					],
					[
						13,
						1.5
					],
					[
						14,
						2.5
					],
					[
						20,
						11.5
					]
				]
			}
		}
	},
	{
		id: "bridge_minor",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"minor"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff",
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						13.5,
						0
					],
					[
						14,
						2.5
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_minor_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"minor_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-opacity": 1,
			"line-width": {
				base: 1.2,
				stops: [
					[
						13.5,
						0
					],
					[
						14,
						2.5
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_secondary_tertiary",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"secondary",
				"tertiary"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fea",
			"line-width": {
				base: 1.2,
				stops: [
					[
						6.5,
						0
					],
					[
						7,
						0.5
					],
					[
						20,
						12
					]
				]
			}
		}
	},
	{
		id: "bridge_secondary_tertiary_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"secondary_construction",
				"tertiary_construction"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fff",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						6.5,
						0
					],
					[
						8,
						0.5
					],
					[
						20,
						13
					]
				]
			}
		}
	},
	{
		id: "bridge_trunk_primary",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"primary",
				"trunk"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fea",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_trunk_primary_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"in",
				"class",
				"primary_construction",
				"trunk_construction"
			]
		],
		layout: {
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "#fea",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_motorway",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fc8",
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_motorway_construction",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"motorway_construction"
			],
			[
				"==",
				"brunnel",
				"bridge"
			],
			[
				"!=",
				"ramp",
				1
			]
		],
		layout: {
			"line-join": "round"
		},
		paint: {
			"line-color": "#fc8",
			"line-dasharray": [
				2,
				2
			],
			"line-width": {
				base: 1.2,
				stops: [
					[
						5,
						0
					],
					[
						7,
						1
					],
					[
						20,
						18
					]
				]
			}
		}
	},
	{
		id: "bridge_major_rail",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"rail"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		paint: {
			"line-color": "#bbb",
			"line-width": {
				base: 1.4,
				stops: [
					[
						14,
						0.4
					],
					[
						15,
						0.75
					],
					[
						20,
						2
					]
				]
			}
		}
	},
	{
		id: "bridge_major_rail_hatching",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: [
			"all",
			[
				"==",
				"class",
				"rail"
			],
			[
				"==",
				"brunnel",
				"bridge"
			]
		],
		paint: {
			"line-color": "#bbb",
			"line-dasharray": [
				0.2,
				8
			],
			"line-width": {
				base: 1.4,
				stops: [
					[
						14.5,
						0
					],
					[
						15,
						3
					],
					[
						20,
						8
					]
				]
			}
		}
	},
	{
		id: "cablecar",
		type: "line",
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		maxzoom: 24,
		filter: [
			"==",
			"class",
			"cable_car"
		],
		layout: {
			"line-cap": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(153, 153, 153, 1)",
			"line-width": {
				base: 1,
				stops: [
					[
						11,
						1
					],
					[
						19,
						2.5
					]
				]
			}
		}
	},
	{
		id: "cablecar-dash",
		type: "line",
		source: "openmaptiles",
		"source-layer": "transportation",
		minzoom: 13,
		maxzoom: 24,
		filter: [
			"==",
			"class",
			"cable_car"
		],
		layout: {
			"line-cap": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "hsl(0, 0%, 60%)",
			"line-dasharray": [
				2,
				3
			],
			"line-width": {
				base: 1,
				stops: [
					[
						11,
						3
					],
					[
						19,
						5.5
					]
				]
			}
		}
	},
	{
		id: "boundary_3",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "boundary",
		filter: [
			"all",
			[
				"in",
				"admin_level",
				3,
				4
			],
			[
				"==",
				"maritime",
				0
			]
		],
		layout: {
			"line-join": "round",
			visibility: "none"
		},
		paint: {
			"line-color": "#9e9cab",
			"line-dasharray": [
				5,
				1
			],
			"line-width": {
				base: 1,
				stops: [
					[
						4,
						0.4
					],
					[
						5,
						1
					],
					[
						12,
						1.8
					]
				]
			}
		}
	},
	{
		id: "boundary_2_maritime",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "boundary",
		filter: [
			"all",
			[
				"==",
				"admin_level",
				2
			],
			[
				"==",
				"maritime",
				1
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "none"
		},
		paint: {
			"line-color": "rgba(77, 144, 175, 1)",
			"line-opacity": {
				base: 1,
				stops: [
					[
						4,
						0
					],
					[
						6,
						1
					]
				]
			},
			"line-width": {
				base: 1,
				stops: [
					[
						5,
						1.2
					],
					[
						12,
						3
					]
				]
			}
		}
	},
	{
		id: "boundary_2_z0-4",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "boundary",
		maxzoom: 5,
		filter: [
			"all",
			[
				"==",
				"admin_level",
				2
			],
			[
				"==",
				"maritime",
				0
			],
			[
				"!has",
				"claimed_by"
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "none"
		},
		paint: {
			"line-color": "rgba(136, 136, 136, 1)",
			"line-opacity": {
				base: 1,
				stops: [
					[
						0,
						0.6
					],
					[
						4,
						0.9
					],
					[
						12,
						0.9
					],
					[
						18,
						0.6
					]
				]
			},
			"line-width": {
				base: 1,
				stops: [
					[
						3,
						1
					],
					[
						5,
						1.2
					],
					[
						12,
						3
					]
				]
			}
		}
	},
	{
		id: "boundary_2_z5-",
		type: "line",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "boundary",
		minzoom: 5,
		filter: [
			"all",
			[
				"==",
				"admin_level",
				2
			],
			[
				"==",
				"maritime",
				0
			]
		],
		layout: {
			"line-cap": "round",
			"line-join": "round",
			visibility: "visible"
		},
		paint: {
			"line-color": "rgba(136, 136, 136, 1)",
			"line-opacity": {
				base: 1,
				stops: [
					[
						0,
						0.6
					],
					[
						4,
						0.9
					],
					[
						12,
						0.9
					],
					[
						18,
						0.6
					]
				]
			},
			"line-width": {
				base: 1,
				stops: [
					[
						3,
						0.7
					],
					[
						7,
						0.9
					],
					[
						12,
						2
					]
				]
			},
			"line-dasharray": [
				3,
				3
			]
		},
		maxzoom: 24
	},
	{
		id: "water_name_line",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "water_name",
		minzoom: 0,
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			]
		],
		layout: {
			"symbol-placement": "line",
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-max-width": 5,
			"text-size": 12,
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(8, 86, 125, 1)",
			"text-halo-color": "rgba(255, 255, 255, 0.45)",
			"text-halo-width": 1.5
		}
	},
	{
		id: "water_name_point-lake",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "water_name",
		minzoom: 0,
		filter: [
			"all",
			[
				"==",
				"$type",
				"Point"
			],
			[
				"in",
				"class",
				"lake"
			]
		],
		layout: {
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-max-width": 5,
			"text-size": 12,
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(8, 86, 125, 1)",
			"text-halo-color": "rgba(255, 255, 255, 0.45)",
			"text-halo-width": 1.5
		}
	},
	{
		id: "waterway-name",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "waterway",
		minzoom: 13,
		filter: [
			"all",
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"has",
				"name"
			]
		],
		layout: {
			"symbol-placement": "line",
			"symbol-spacing": 350,
			"text-field": "{name:latin} {name:nonlatin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-letter-spacing": 0.1,
			"text-max-width": 5,
			"text-offset": [
				0,
				-0.8
			],
			"text-rotation-alignment": "map",
			"text-size": 11,
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(8, 86, 125, 1)",
			"text-halo-color": "rgba(255, 255, 255, 0.45)",
			"text-halo-width": 2
		}
	},
	{
		id: "water_name_point",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "water_name",
		minzoom: 0,
		filter: [
			"all",
			[
				"==",
				"$type",
				"Point"
			],
			[
				"!=",
				"class",
				"lake"
			]
		],
		layout: {
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-max-width": 5,
			"text-size": 13,
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(8, 86, 125, 1)",
			"text-halo-color": "rgba(255, 255, 255, 0.45)",
			"text-halo-width": 2
		}
	},
	{
		id: "pyr_refuges",
		type: "symbol",
		source: "pyr",
		"source-layer": "refuges",
		paint: {
		},
		layout: {
			"icon-image": {
				stops: [
					[
						0,
						""
					],
					[
						10,
						"shelter_11"
					]
				]
			},
			"icon-size": {
				stops: [
					[
						10,
						0.5
					],
					[
						12,
						1
					]
				]
			}
		},
		minzoom: 10,
		maxzoom: 24
	},
	{
		id: "gdv_tracks-casing",
		type: "line",
		source: "gdv_tracks",
		paint: {
			"line-color": "#fff",
			"line-width": 5
		},
		minzoom: 0,
		maxzoom: 24
	},
	{
		id: "road_label_track",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation_name",
		filter: [
			"all",
			[
				"in",
				"class",
				"track"
			]
		],
		layout: {
			"symbol-placement": "line",
			"text-anchor": "center",
			"text-field": "{name:latin} {name:nonlatin}",
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-offset": [
				0,
				0.15
			],
			"text-size": {
				base: 1,
				stops: [
					[
						13,
						12
					],
					[
						14,
						13
					]
				]
			},
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(89, 105, 63, 1)",
			"text-halo-blur": 0.5,
			"text-halo-color": "rgba(255,255,255,0.5)",
			"text-halo-width": 1
		}
	},
	{
		id: "road_label",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "transportation_name",
		filter: [
			"all",
			[
				"!=",
				"class",
				"track"
			]
		],
		layout: {
			"symbol-placement": "line",
			"text-anchor": "center",
			"text-field": "{name:latin} {name:nonlatin}",
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-offset": [
				0,
				0.15
			],
			"text-size": {
				base: 1,
				stops: [
					[
						13,
						10
					],
					[
						14,
						12
					]
				]
			},
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(99, 94, 84, 1)",
			"text-halo-blur": 0.5,
			"text-halo-color": "rgba(255,255,255,0.5)",
			"text-halo-width": 1
		}
	},
	{
		id: "highway-shield",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "transportation_name",
		minzoom: 8,
		filter: [
			"all",
			[
				"<=",
				"ref_length",
				6
			],
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"!in",
				"network",
				"us-interstate",
				"us-highway",
				"us-state"
			]
		],
		layout: {
			"icon-image": "road_{ref_length}",
			"icon-rotation-alignment": "viewport",
			"icon-size": 1,
			"symbol-placement": {
				base: 1,
				stops: [
					[
						10,
						"point"
					],
					[
						11,
						"line"
					]
				]
			},
			"symbol-spacing": 200,
			"text-field": "{ref}",
			"text-font": [
				"Noto Sans Regular"
			],
			"text-rotation-alignment": "viewport",
			"text-size": 10,
			visibility: "none"
		},
		paint: {
		}
	},
	{
		id: "highway-shield-us-interstate",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "transportation_name",
		minzoom: 7,
		filter: [
			"all",
			[
				"<=",
				"ref_length",
				6
			],
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"in",
				"network",
				"us-interstate"
			]
		],
		layout: {
			"icon-image": "{network}_{ref_length}",
			"icon-rotation-alignment": "viewport",
			"icon-size": 1,
			"symbol-placement": {
				base: 1,
				stops: [
					[
						7,
						"point"
					],
					[
						7,
						"line"
					],
					[
						8,
						"line"
					]
				]
			},
			"symbol-spacing": 200,
			"text-field": "{ref}",
			"text-font": [
				"Noto Sans Regular"
			],
			"text-rotation-alignment": "viewport",
			"text-size": 10,
			visibility: "none"
		},
		paint: {
			"text-color": "rgba(0, 0, 0, 1)"
		}
	},
	{
		id: "highway-shield-us-other",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "transportation_name",
		minzoom: 9,
		filter: [
			"all",
			[
				"<=",
				"ref_length",
				6
			],
			[
				"==",
				"$type",
				"LineString"
			],
			[
				"in",
				"network",
				"us-highway",
				"us-state"
			]
		],
		layout: {
			"icon-image": "{network}_{ref_length}",
			"icon-rotation-alignment": "viewport",
			"icon-size": 1,
			"symbol-placement": {
				base: 1,
				stops: [
					[
						10,
						"point"
					],
					[
						11,
						"line"
					]
				]
			},
			"symbol-spacing": 200,
			"text-field": "{ref}",
			"text-font": [
				"Noto Sans Regular"
			],
			"text-rotation-alignment": "viewport",
			"text-size": 10,
			visibility: "none"
		},
		paint: {
			"text-color": "rgba(0, 0, 0, 1)"
		}
	},
	{
		id: "place_other",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		filter: [
			"all",
			[
				"in",
				"class",
				"hamlet",
				"island",
				"islet",
				"neighbourhood",
				"suburb"
			]
		],
		layout: {
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Medium",
				"Noto Sans Regular"
			],
			"text-letter-spacing": 0.1,
			"text-max-width": 9,
			"text-size": {
				base: 1.2,
				stops: [
					[
						12,
						10
					],
					[
						15,
						14
					]
				]
			},
			"text-transform": "uppercase",
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(47, 49, 60, 1)",
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 1.2
		}
	},
	{
		id: "hr_hrp-name",
		type: "symbol",
		source: "pyr",
		"source-layer": "hiking_routes",
		paint: {
			"text-halo-color": "rgba(255, 0, 0, 1)",
			"text-halo-width": 100,
			"text-halo-blur": 0,
			"text-color": "rgba(255,255,255,1)",
			"text-opacity": 1,
			"text-translate": [
				0,
				0
			],
			"text-translate-anchor": "viewport"
		},
		minzoom: 0,
		layout: {
			"symbol-spacing": {
				stops: [
					[
						7,
						10
					],
					[
						10,
						600
					]
				]
			},
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-offset": [
				0,
				0
			],
			"text-rotation-alignment": "viewport",
			"text-size": 11,
			"icon-size": 0.8,
			"text-field": "{ref}",
			"text-allow-overlap": false,
			visibility: "visible",
			"symbol-placement": "line",
			"text-ignore-placement": false,
			"symbol-z-order": "auto",
			"symbol-avoid-edges": false,
			"text-max-width": 10,
			"text-max-angle": 360,
			"text-keep-upright": true,
			"text-letter-spacing": -0.05
		},
		filter: [
			"all",
			[
				"==",
				"ref",
				"HRP"
			]
		]
	},
	{
		id: "mountain_peak",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "mountain_peak",
		minzoom: 11,
		maxzoom: 24,
		filter: [
			"all",
			[
				"==",
				"$type",
				"Point"
			],
			[
				"==",
				"class",
				"peak"
			]
		],
		layout: {
			"icon-size": 1,
			"text-anchor": "bottom",
			"text-field": "{name:latin} {name:nonlatin}\n{ele} m\n▲",
			"text-font": [
				"Noto Sans Regular"
			],
			"text-max-width": {
				stops: [
					[
						6,
						8
					],
					[
						10,
						8
					]
				]
			},
			"text-offset": [
				0,
				0.5
			],
			"text-size": 11,
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(155, 112, 87, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(255,255,255,1)",
			"text-halo-width": 1
		}
	},
	{
		id: "mountain_volcano",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "mountain_peak",
		minzoom: 9,
		maxzoom: 24,
		filter: [
			"all",
			[
				"==",
				"$type",
				"Point"
			],
			[
				"==",
				"rank",
				1
			],
			[
				"==",
				"class",
				"volcano"
			]
		],
		layout: {
			"icon-size": 1,
			"text-anchor": "bottom",
			"text-field": "{name:latin} {name:nonlatin}\n{ele} m\n▲",
			"text-font": [
				"Noto Sans Regular"
			],
			"text-max-width": {
				stops: [
					[
						6,
						8
					],
					[
						10,
						8
					]
				]
			},
			"text-offset": [
				0,
				0.5
			],
			"text-size": 11,
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(219, 76, 10, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(255,255,255,1)",
			"text-halo-width": 1
		}
	},
	{
		id: "place_village",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		minzoom: 10,
		maxzoom: 14,
		filter: [
			"all",
			[
				"==",
				"class",
				"village"
			]
		],
		layout: {
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-max-width": 8,
			"text-size": {
				base: 1.2,
				stops: [
					[
						10,
						12
					],
					[
						15,
						22
					]
				]
			},
			visibility: "none"
		},
		paint: {
			"text-color": "#333",
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 1.2
		}
	},
	{
		id: "place_town",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		minzoom: 0,
		maxzoom: 14,
		filter: [
			"all",
			[
				"==",
				"class",
				"town"
			]
		],
		layout: {
			"icon-image": {
				base: 1,
				stops: [
					[
						0,
						"dot_9"
					],
					[
						10,
						""
					]
				]
			},
			"text-anchor": {
				stops: [
					[
						6,
						"bottom"
					],
					[
						10,
						"center"
					]
				]
			},
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-max-width": 8,
			"text-offset": [
				0,
				0
			],
			"text-size": {
				base: 1.2,
				stops: [
					[
						7,
						8
					],
					[
						11,
						16
					]
				]
			},
			visibility: "visible"
		},
		paint: {
			"text-color": "#333",
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 1.2
		}
	},
	{
		id: "place_city",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		minzoom: 5,
		maxzoom: 12,
		filter: [
			"all",
			[
				"==",
				"class",
				"city"
			],
			[
				"<=",
				"rank",
				8
			],
			[
				"!=",
				"capital",
				2
			]
		],
		layout: {
			"icon-allow-overlap": false,
			"icon-image": {
				base: 1,
				stops: [
					[
						0,
						"dot_9"
					],
					[
						10,
						""
					]
				]
			},
			"icon-optional": false,
			"text-anchor": {
				stops: [
					[
						6,
						"bottom"
					],
					[
						10,
						"center"
					]
				]
			},
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Medium",
				"Noto Sans Regular"
			],
			"text-max-width": 8,
			"text-offset": [
				0,
				0
			],
			"text-size": {
				base: 1.2,
				stops: [
					[
						7,
						13
					],
					[
						11,
						24
					]
				]
			},
			visibility: "visible"
		},
		paint: {
			"text-color": "#333",
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 1.2
		}
	},
	{
		id: "place_city_capital",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		minzoom: 5,
		maxzoom: 12,
		filter: [
			"all",
			[
				"==",
				"capital",
				2
			]
		],
		layout: {
			"icon-allow-overlap": false,
			"icon-image": {
				base: 1,
				stops: [
					[
						0,
						"dot_11"
					],
					[
						8,
						""
					]
				]
			},
			"icon-optional": false,
			"text-anchor": {
				stops: [
					[
						6,
						"bottom"
					],
					[
						8,
						"center"
					]
				]
			},
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Medium",
				"Noto Sans Regular"
			],
			"text-max-width": 8,
			"text-offset": [
				0,
				0
			],
			"text-size": {
				base: 1.2,
				stops: [
					[
						7,
						13
					],
					[
						11,
						28
					]
				]
			},
			visibility: "visible"
		},
		paint: {
			"text-color": "#333",
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 1.2
		}
	},
	{
		id: "state",
		type: "symbol",
		source: "openmaptiles",
		"source-layer": "place",
		minzoom: 3,
		maxzoom: 8,
		filter: [
			"all",
			[
				"==",
				"class",
				"state"
			]
		],
		layout: {
			"text-field": "{name:latin}\n{name:nonlatin}",
			"text-font": [
				"Roboto Medium",
				"Noto Sans Regular"
			],
			"text-size": {
				stops: [
					[
						4,
						11
					],
					[
						6,
						15
					]
				]
			},
			"text-transform": "uppercase",
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(94, 95, 101, 1)",
			"text-halo-color": "rgba(255,255,255,0.7)",
			"text-halo-width": 1
		}
	},
	{
		id: "country_other",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		filter: [
			"all",
			[
				"==",
				"class",
				"country"
			],
			[
				"!has",
				"iso_a2"
			]
		],
		layout: {
			"text-field": "{name:latin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-max-width": 6.25,
			"text-size": {
				stops: [
					[
						3,
						9
					],
					[
						7,
						15
					]
				]
			},
			"text-transform": "none",
			visibility: "none"
		},
		paint: {
			"text-color": "rgba(47, 49, 60, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 0.7
		}
	},
	{
		id: "country_3",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		maxzoom: 8,
		filter: [
			"all",
			[
				">=",
				"rank",
				3
			],
			[
				"==",
				"class",
				"country"
			],
			[
				"has",
				"iso_a2"
			]
		],
		layout: {
			"text-field": "{name:latin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-max-width": 6.25,
			"text-size": {
				stops: [
					[
						3,
						11
					],
					[
						7,
						17
					]
				]
			},
			"text-transform": "none",
			visibility: "none"
		},
		paint: {
			"text-color": "rgba(47, 49, 60, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 0.7
		}
	},
	{
		id: "country_2",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		maxzoom: 8,
		filter: [
			"all",
			[
				"==",
				"rank",
				2
			],
			[
				"==",
				"class",
				"country"
			],
			[
				"has",
				"iso_a2"
			]
		],
		layout: {
			"text-field": "{name:latin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-max-width": 6.25,
			"text-size": {
				stops: [
					[
						2,
						11
					],
					[
						5,
						17
					]
				]
			},
			"text-transform": "none",
			visibility: "none"
		},
		paint: {
			"text-color": "rgba(47, 49, 60, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 0.7
		}
	},
	{
		id: "country_1",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		maxzoom: 8,
		filter: [
			"all",
			[
				"==",
				"rank",
				1
			],
			[
				"==",
				"class",
				"country"
			],
			[
				"has",
				"iso_a2"
			]
		],
		layout: {
			"text-field": "{name:latin}",
			"text-font": [
				"Noto Sans Italic"
			],
			"text-max-width": 6.25,
			"text-size": {
				stops: [
					[
						1,
						11
					],
					[
						4,
						17
					]
				]
			},
			"text-transform": "none",
			visibility: "none"
		},
		paint: {
			"text-color": "rgba(47, 49, 60, 1)",
			"text-halo-blur": 1,
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 0.7
		}
	},
	{
		id: "continent",
		type: "symbol",
		metadata: {
		},
		source: "openmaptiles",
		"source-layer": "place",
		maxzoom: 1,
		filter: [
			"all",
			[
				"==",
				"class",
				"continent"
			]
		],
		layout: {
			"text-field": "{name:latin}",
			"text-font": [
				"Noto Sans Bold"
			],
			"text-justify": "center",
			"text-size": 13,
			"text-transform": "uppercase",
			visibility: "visible"
		},
		paint: {
			"text-color": "rgba(59, 60, 58, 1)",
			"text-halo-color": "rgba(255,255,255,0.7)",
			"text-halo-width": 1
		}
	},
	{
		id: "pyr_footprint",
		type: "line",
		source: "pyr",
		"source-layer": "footprint",
		paint: {
			"line-dasharray": {
				stops: [
					[
						6,
						[
							14,
							3
						]
					],
					[
						10,
						[
							6,
							3
						]
					]
				]
			},
			"line-color": "rgba(0, 0, 0, 0.51)"
		},
		layout: {
		},
		minzoom: 7,
		maxzoom: 24
	},
	{
		id: "pyr_peaks3000",
		type: "symbol",
		source: "pyr",
		"source-layer": "peaks3000",
		layout: {
			"icon-image": "mountain_11",
			"icon-allow-overlap": false,
			"icon-padding": 10,
			"symbol-z-order": "auto",
			"symbol-sort-key": [
				"*",
				[
					"to-number",
					[
						"get",
						"ele"
					]
				],
				-1
			],
			"text-padding": 2,
			"text-field": {
				stops: [
					[
						0,
						""
					],
					[
						9,
						"{name}"
					],
					[
						12,
						"{name}\n{ele}m"
					]
				]
			},
			"text-anchor": "top",
			"text-justify": "center",
			"text-size": 11,
			"icon-offset": [
				0,
				0
			],
			visibility: "visible",
			"icon-size": {
				stops: [
					[
						6,
						0.6
					],
					[
						10,
						1
					]
				]
			},
			"text-font": [
				"Noto Sans Regular"
			]
		},
		minzoom: 7,
		paint: {
			"text-halo-width": 2,
			"text-halo-color": "rgba(255,255,255,1)",
			"text-color": "#000",
			"text-halo-blur": 1,
			"text-translate": [
				0,
				8
			]
		},
		maxzoom: 24
	},
	{
		id: "gdv_tracks",
		type: "line",
		source: "gdv_tracks",
		paint: {
			"line-color": "#d37aff",
			"line-width": 2
		},
		minzoom: 0,
		maxzoom: 24
	},
	{
		id: "gdv_waypoints",
		type: "symbol",
		source: "gdv_waypoints",
		layout: {
			"icon-image": "dot_11"
		},
		minzoom: 0,
		maxzoom: 24
	},
	{
		id: "pyr_resupply",
		type: "symbol",
		source: "pyr",
		"source-layer": "pois",
		paint: {
			"text-halo-color": "rgba(255,255,255,1)",
			"text-halo-width": 2
		},
		layout: {
			"icon-image": "grocery_11",
			"text-anchor": "left",
			"text-field": {
				stops: [
					[
						0,
						""
					],
					[
						8.5,
						"{place}"
					],
					[
						13,
						"{name}"
					]
				]
			},
			"text-font": [
				"Roboto Regular",
				"Noto Sans Regular"
			],
			"text-max-width": 9,
			"text-offset": [
				0.7,
				0.1
			],
			"text-size": {
				stops: [
					[
						6,
						9
					],
					[
						10,
						13
					]
				]
			},
			"icon-allow-overlap": false,
			visibility: "visible",
			"icon-size": {
				stops: [
					[
						7.5,
						0.8
					],
					[
						16,
						1.3
					]
				]
			},
			"text-ignore-placement": false,
			"symbol-spacing": 1,
			"symbol-z-order": "auto",
			"text-allow-overlap": false,
			"text-justify": "left"
		},
		filter: [
			"all",
			[
				"==",
				"type",
				"resupply"
			]
		],
		minzoom: 7.5,
		maxzoom: 24
	},
	{
		id: "gdv_updates",
		type: "symbol",
		source: "gdv_updates",
		layout: {
			"icon-image": "gdvPin",
			"icon-size": [
				"interpolate",
				[
					"linear"
				],
				[
					"zoom"
				],
				7,
				0.2,
				9,
				0.4
			],
			"icon-anchor": "bottom",
			"icon-allow-overlap": true
		},
		minzoom: 0,
		maxzoom: 24
	}
];
var id = "topo";
var style = {
	version: version,
	name: name,
	metadata: metadata,
	sources: sources,
	sprite: sprite,
	glyphs: glyphs,
	layers: layers,
	id: id
};

export default style;
export { glyphs, id, layers, metadata, name, sources, sprite, version };
//# sourceMappingURL=style-5e679520.js.map