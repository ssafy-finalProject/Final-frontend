<script setup>
import { toRaw } from "vue";

import { ref, onMounted } from "vue";

const markerPositions1 = ref([
  [33.452278, 126.567803],
  [33.452671, 126.574792],
  [33.451744, 126.572441],
]);

const markerPositions2 = ref([
  [37.499590490909185, 127.0263723554437],
  [37.499427948430814, 127.02794423197847],
  [37.498553760499505, 127.02882598822454],
  [37.497625593121384, 127.02935713582038],
  [37.49629291770947, 127.02587362608637],
  [37.49754540521486, 127.02546694890695],
  [37.49646391248451, 127.02675574250912],
]);

const markers = ref([]);
const infowindow = ref(null);

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  };

  const map = new kakao.maps.Map(container, options);
  return map;
};

const map = ref(null);

const changeSize = (size) => {
  const container = document.getElementById("map");
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  map.value && map.value.relayout();
};

const displayMarker = (positions) => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const newMarkers = positions.map(
    (position) =>
      new kakao.maps.Marker({
        map: map.value,
        position: new kakao.maps.LatLng(...position),
      })
  );

  markers.value = newMarkers;

  const bounds = newMarkers.reduce(
    (bounds, marker) => bounds.extend(marker.getPosition()),
    new kakao.maps.LatLngBounds()
  );

  map.value.setBounds(bounds);
};

const displayInfoWindow = () => {
  if (infowindow.value && infowindow.value.getMap()) {
    map.value.setCenter(infowindow.value.getPosition());
    return;
  }

  const iwContent = '<div style="padding:5px;">Hello World!</div>';
  const iwPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  const iwRemoveable = true;

  infowindow.value = new kakao.maps.InfoWindow({
    map: map.value,
    position: iwPosition,
    content: iwContent,
    removable: iwRemoveable,
  });

  map.value.setCenter(iwPosition);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    map.value = initMap();
  } else {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(() => (map.value = initMap()));
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=98d10c8d0c83cd460b0ffd842b3d6fc5";
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div>
    <h1>카카오 맵 테스트</h1>
    <div id="map"></div>
    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">Show</button>
      <button @click="displayMarker(markerPositions1)">Marker Set 1</button>
      <button @click="displayMarker(markerPositions2)">Marker Set 2</button>
      <button @click="displayMarker([])">Marker Set 3 (Empty)</button>
      <button @click="displayInfoWindow">Infowindow</button>
    </div>
  </div>
</template>

<style scoped>
#map {
  width: 400px;
  height: 400px;
}
* {
  text-align: center;
}
</style>
