<script setup>
import { ref, watch, onMounted } from "vue";
import { listDetail } from "@/api/map";

var map;
var realData = ref([]);
const articleNo = 4;
let polyline;
const markerPins = ref([]);
const locationData = ref([]);
const markers = ref([]); // 시작지
const stopover = ref([]); // 경유지
const destination = ref([]); // 도착지

var ps;
var infowindow;

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () =>
      kakao.maps.load(() => {
        initMap();
      });
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");

  listDetail(
    articleNo,
    ({ data }) => {
      console.log(data);
      // console.log(data[0].category);
      const options = {
        center: new kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };
      map = new kakao.maps.Map(container, options);
      ps = new kakao.maps.services.Places();
      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      for (let i = 0; i < data.length; i++) {
        const markerData = { ...data[i] };
        locationData.value.push(markerData);

        if (data[i].category === "시작지") {
          console.log("시작지");
          markers.value = { ...data[i] };
        } else if (data[i].category === "경유지") {
          console.log("경유지");
          stopover.value.push({ ...data[i] });
        } else if (data[i].category === "도착지") {
          console.log("도착지");
          destination.value = { ...data[i] };
        }
      }
      console.log("markers = ", markers.value);
      console.log("stopover = ", stopover.value);
      console.log("destination = ", destination.value);
      displayRoute();
    },
    (fail) => {
      console.log(fail);
    }
  ); // article_no 가 1번일 때, 지도의 좌표 값 출력
  // markers , stopover, destination 에 값

  ps = new kakao.maps.services.Places();
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  console.log("입력");
};

const displayRoute = () => {
  if (polyline) {
    polyline.setMap(null);
  }

  const linePath = [];

  // console.log(markers.value);
  // 마커 표시
  const markerOptions = {
    map: map,
    position: new kakao.maps.LatLng(
      markers.value.latitude,
      markers.value.longitude
    ),
  };
  const marker = new kakao.maps.Marker(markerOptions);
  markerPins.value.push(marker);

  linePath.push(
    new kakao.maps.LatLng(markers.value.latitude, markers.value.longitude)
  );

  for (let i = 0; i < stopover.value.length; i++) {
    const stopoverOptions = {
      map: map,
      position: new kakao.maps.LatLng(
        stopover.value[i].latitude,
        stopover.value[i].longitude
      ),
    };
    let stopoverMarker = new kakao.maps.Marker(stopoverOptions);
    markerPins.value.push(stopoverMarker);

    linePath.push(
      new kakao.maps.LatLng(
        stopover.value[i].latitude,
        stopover.value[i].longitude
      )
    );
  }

  const destinationOptions = {
    map: map,
    position: new kakao.maps.LatLng(
      destination.value.latitude,
      destination.value.longitude
    ),
  };
  const destinationMarker = new kakao.maps.Marker(destinationOptions);
  markerPins.value.push(destinationMarker);

  linePath.push(
    new kakao.maps.LatLng(
      destination.value.latitude,
      destination.value.longitude
    )
  );

  // 마커와 선 표시
  polyline = new kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 5,
    strokeColor: "#FFAE00",
    strokeOpacity: 0.7,
    strokeStyle: "solid",
  });

  polyline.setMap(map);
  mapInit();
};

function mapInit() {
  console.log(locationData.value[0].latitude);
  console.log(locationData.value.length);
  var bounds = new kakao.maps.LatLngBounds();
  for (let i = 0; i < locationData.value.length; i++) {
    bounds.extend(
      new kakao.maps.LatLng(
        locationData.value[i].latitude,
        locationData.value[i].longitude
      )
    );
  }

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}
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

function sendMarkerInfo(place, type) {
  if (type === "출발지") {
    if (markers.value.length === 1) {
      markers.value.pop();
    }
    markers.value.push(place);
    console.log(markers);
  } else if (type === "경유지") {
    stopover.value.push(place);
    console.log(stopover);
  } else {
    if (destination.value.length === 1) {
      destination.value.pop();
    }
    destination.value.push(place);
    console.log(destination);
  }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(`
      <div class="infowindow-container">
        <div style="margin-bottom: 5px;">${place.place_name}</div>
        <div class="infowindow-buttons">
          <button id="infoBtn" onclick="sendMarkerInfoHandler(${place.id}, '출발지')">출발지</button>
          <button id="midBtn" onclick="sendMarkerInfoHandler(${place.id}, '경유지')">경유지</button>
          <button id="lastBtn" onclick="sendMarkerInfoHandler(${place.id}, '도착지')">도착지</button>
        </div>
      </div>
    `);

    infowindow.open(map, marker);
  });

  // 클릭 이벤트 핸들러 추가 ( 시작지, 경유지, 도착지에 따른 값을 type으로 받고, 받은 type들을 통해서,
  // 함수들의 배열값들을 달리 넣어준다. 시작지는 markers, 경유지는 stopover, 도착지는 destination에 넣는다.
  window.sendMarkerInfoHandler = function (id, type) {
    // console.log(`${type} 선택: ${type}`);
    if (type === "출발지") {
      for (let i = 0; i < realData.length; i++) {
        if (realData[i].id == id) {
          console.log("현재 찾은 도시이름: " + realData[i].address_name);
          sendMarkerInfo(realData[i], type);
        }
      }
    } else if (type === "경유지") {
      for (let i = 0; i < realData.length; i++) {
        if (realData[i].id == id) {
          console.log("현재 찾은 도시이름: " + realData[i].address_name);
          sendMarkerInfo(realData[i], type);
        }
      }
    } else {
      for (let i = 0; i < realData.length; i++) {
        if (realData[i].id == id) {
          console.log("현재 찾은 도시이름: " + realData[i].address_name);
          sendMarkerInfo(realData[i], type);
        }
      }
    }
  };
}
</script>
<template>
  <!-- <div class="container-fluid row"> -->
  <div id="map" class="col-8"></div>
  <!-- </div> -->
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
.infowindow-container {
  max-width: 300px; /* Adjust the maximum width as needed */
  padding: 10px;
  text-align: center;
}

.infowindow-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.infowindow-buttons button {
  flex-grow: 1;
  margin: 0 2px;
}

#determine {
  margin: 2px;
  width: 90px;
  justify-content: center;
  float: right;
}
</style>
