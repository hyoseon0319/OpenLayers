import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {Attribution, defaults as defaultControls} from 'ol/control';

var attribution = new Attribution({
  collapsible: false,
});
var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }) ],
  controls: defaultControls({attribution: false}).extend([attribution]),
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

// 크기 조정 시 작은 지도에서 축소됨
function checkSize() {
  var small = map.getSize()[0] < 600;
  attribution.setCollapsible(small);
  attribution.setCollapsed(small);
}

window.addEventListener('resize', checkSize);
checkSize();
