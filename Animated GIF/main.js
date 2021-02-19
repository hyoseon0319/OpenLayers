import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import {Stamen, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

// Point Feature ( 그외 Line Feature, Polygon Feature )
var iconFeature = new Feature({
  geometry: new Point([0, 0]),
});

// Feature 들의 집합
var vectorSource = new VectorSource({
  features: [iconFeature],
});

// 클라이언트 단에서 직접 레이어를 그려주는 방식
// 가장 기본적인 ol의 화면구성 레이어 값
// 벡터, 이미지, 타일
var vectorLayer = new VectorLayer({ 
  source: vectorSource,
});

var rasterLayer = new TileLayer({
  source: new Stamen({
    layer: 'toner',
  }),
});

// 지도 객체와 사용할 레이어 생성
var map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});


// 지도 위 gif 띄우기
var gifUrl = 'data/globe.gif';
var gif = gifler(gifUrl);
gif.frames(
  document.createElement('canvas'),
  function (ctx, frame) {
    if (!iconFeature.getStyle()) {
      iconFeature.setStyle(
        new Style({
          image: new Icon({
            img: ctx.canvas,
            imgSize: [frame.width, frame.height],
            opacity: 0.8,
          }),
        })
      );
    }
    ctx.clearRect(0, 0, frame.width, frame.height);
    ctx.drawImage(frame.buffer, frame.x, frame.y);
    map.render();
  },
  true
);

// change mouse cursor when over icon
map.on('pointermove', function (e) {
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
