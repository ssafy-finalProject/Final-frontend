<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMap from "./components/map/TheMap.vue";
import KakaoMap from "./views/KakaoMap.vue";
</script>

<template>
  <TheHeader></TheHeader>
  <TheMap></TheMap>
  <!-- <RouterView></RouterView> -->
  <!-- <TheFooter></TheFooter> -->
  <KakaoMap />
</template>

<style scoped></style>
