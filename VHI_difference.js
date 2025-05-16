import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import View from 'ol/View.js';
import 'ol/ol.css';
import OSM from 'ol/source/OSM.js';

// GeoTIFF source with two VHI dates
const source = new GeoTIFF({
  sources: [
    {
      url: 'https://data.geo.admin.ch/ch.swisstopo.swisseo_vhi_v100/2020-08-11t235959/ch.swisstopo.swisseo_vhi_v100_mosaic_2020-08-11t235959_forest-10m.tif',
      bands: [1],
    },
    {
      url: 'https://data.geo.admin.ch/ch.swisstopo.swisseo_vhi_v100/2021-08-12t235959/ch.swisstopo.swisseo_vhi_v100_mosaic_2021-08-12t235959_forest-10m.tif',
      bands: [1],
    },
  ],
  normalize: false,
});

const ndvi_before = [
  '/',
  ['-', ['band', 2], ['band', 1]],
  ['+', ['band', 2], ['band', 1]],
];

const ndvi_after = [
  '/',
  ['-', ['band', 4], ['band', 3]],
  ['+', ['band', 4], ['band', 3]],
];
// VHI difference expression
const difference = ['-', ['/', ['band', 1], 100], ['/', ['band', 2], 100]];

// Color style for diverging VHI difference
const styledDifference = [
  'interpolate',
  ['linear'],
  difference, // Your pre-calculated difference expression
  -1,
  'rgb(178,24,43)', // Dark red for -1
  -0.2,
  'rgb(214,96,77)', // Medium red
  0,
  'rgb(245,245,245)', // Light gray at zero
  0.2,
  'rgb(67,147,195)', // Medium blue
  1,
  'rgb(33,102,172)', // Dark blue for +1
];

const background = new TileLayer({
  source: new OSM(),
});

// Map setup
const map = new Map({
  target: 'map',
  layers: [
    // background,
    new TileLayer({
      style: {color: styledDifference},
      source,
    }),
  ],
  view: source.getView(),
  // view: new View({
  //   projection: 'EPSG:3857',
  //   center: [948032, 5983208],
  //   zoom: 12,
  // }),
});
