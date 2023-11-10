<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

import TheMap from "./components/map/TheMap.vue";
import KakaoMap from "./views/KakaoMap.vue";
import TheMain from "./views/TheMain.vue";
</script>

<template>
  <TheHeader></TheHeader>

  <TheMap></TheMap>
  <KakaoMap />
  <router-view></router-view>
</template>

<style scoped></style>
