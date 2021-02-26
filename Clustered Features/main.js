import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {Cluster, OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

// 군집화를 위한 거리값
var distance = document.getElementById('distance');

// 군집화 대상 포인트 개수
var count = 20000; 
// 군집화 대상 포인트에 대한 Feature ( 좌표값, 속성값 )
// vectorSource의 구성요소
var features = new Array(count);

// 군집화 대상이 되는 포인트 위치 - 무작위로 결정
var e = 4500000;
for (var i = 0; i < count; ++i) {
  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  features[i] = new Feature(new Point(coordinates)); // 포인트 Feature 생성
}

var source = new VectorSource({
    features: features,
});

var clusterSource = new Cluster({
    distance: parseInt(distance.value, 10),
    source: source,
});

// 레이어 생성
var styleCache = {};
var clusters = new VectorLayer({
  source: clusterSource,
  style: function (feature) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});

var raster = new TileLayer({
  source: new OSM(),
});

var map = new Map({
  layers: [raster, clusters],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

// cluster를 위한 거리값 지정
// 사용자가 거리값 변경 -> 클리스터링에 반영할수있도록
distance.addEventListener('input', function () {
  clusterSource.setDistance(parseInt(distance.value, 10));
});