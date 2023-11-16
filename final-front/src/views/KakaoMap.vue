<script setup>
import { ref, watch, onMounted } from "vue";
import TravelList from "../components/map/TravelList.vue";

var map;
var realData = ref([]);
const searchKeyword = ref("");
const positions = ref([]);
const markers = ref([]);
const startPlace = ref("");
var ps;
var infowindow;

const searchPlaces = () => {
  ps.keywordSearch(searchKeyword.value, placesSearchCB);
};

// const props = defineProps({ stations: Array, selectStation: Object });

// watch(
//   () => props.selectStation.value,
//   () => {
//     // 이동할 위도 경도 위치를 생성합니다
//     var moveLatLon = new kakao.maps.LatLng(
//       props.selectStation.lat,
//       props.selectStation.lng
//     );

//     // 지도 중심을 부드럽게 이동시킵니다
//     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//     map.panTo(moveLatLon);
//   },
//   { deep: true }
// );

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.500613, 127.036431),
    level: 5,
  };

  map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
};


// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var bounds = new kakao.maps.LatLngBounds();
    realData = data;

    for (var i = 0; i < data.length; i++) {
      // console.log(data[i]);
      // console.log(realData[i]);
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

function sendMarkerInfo(place) {
  if (markers.value.length === 1) {
    markers.value.pop();
    // console.log(markers.value.length);
  }
  markers.value.push(place);
  // console.log(markers.value.length);
  // console.log(markers);
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // console.log(place);

  

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;text-align=center">' +
        place.place_name +
        "</div>" +
        `<div><button id="infoBtn" onclick="sendMarkerInfoHandler(${place.id})">` +
        "추가" +
        "</div>"
    );

    infowindow.open(map, marker);
  });
  // 버튼 클릭 이벤트 핸들러 추가
  window.sendMarkerInfoHandler = function (id) {
    console.log(id);
    for (let i = 0; i < realData.length; i++){
      // console.log(realData[i].id);
      if (realData[i].id == id) {
        console.log("현재 찾은 도시이름 : " + realData[i].address_name);
      }
    }
    sendMarkerInfo(place);
  };
}
</script>
<template>
  <div class="container">
    <div id="search">
      <input v-model="searchKeyword" placeholder="장소를 검색하세요." />
      <button @click="searchPlaces">검색</button>
    </div>
    <div class="container-fluid row">
      <div id="map" class="col-8"></div>
      <TravelList :markers="markers" class="col-4"/>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
}

#search {
  width: 100%;
  padding: 10px;
}

#map {
  height: 700px;
}
</style>
