<script setup>
import { ref, onMounted } from "vue";

let map;

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=98d10c8d0c83cd460b0ffd842b3d6fc5";
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
};
</script>
<template>
  <div>
    <div id="map" style="width: 70%; height: 700px"></div>
  </div>
</template>

<style scoped></style>
