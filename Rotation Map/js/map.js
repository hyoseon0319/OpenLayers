/* 지도(Map)생성 */
var map = new ol.Map({ // Map객체 생성자 (Ol.Map) - openLayers 제공
    // 해당 지도를 표시할 영역 (main.html 의 div id)
    target: 'map', 
    
    // 지도는 map객체에 layer 형태로 담김
    // 한 객체의 배열에 여러 개의 map 담는것도 가능
    layers: [
        new ol.layer.Tile({ 
            source: new ol.source.OSM() // Open Street Map을 layer로 담음
        })
    ],
    // 지도의 어느 부분을 보여줄 것인지 설정
    view: new ol.View({
        // 중심좌표 지도에 맞는 좌표계로 변환 - 서울 강남역 표시
        center: ol.proj.fromLonLat([127.027583,37.497928]), 
        zoom: 6,
        enableRotation: false // OSM 회전 임의로 막는 설정
    })
});


// https://openlayers.org/en/latest/apidoc/ 객체마다 다양한 함수 확인가능

/* 지도(Map) 회전 함수 */
function viewRotation(direction){
    var view = map.getView(); // map객체의 view 속성 값
    var rotation = view.getRotation(); // 현재 map의 회전 값

    // 지도를 회전시키는 컨트롤
    if( direction == 'left' ){
        view.setRotation(rotation - (Math.PI/6)); 
    } else if( direction == 'right' ){
        view.setRotation(rotation + (Math.PI/6));
    }
}