<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./components/member/TheLogin.vue";
import TheMap from "./components/map/TheMap.vue";
import KakaoMap from "./views/KakaoMap.vue"
</script>

<template>
  <div>
    <TheHeader></TheHeader>
    <TheMap></TheMap>
    <KakaoMap></KakaoMap>
    <!-- <router-view></router-view> -->
    <!-- <TheFooter></TheFooter> -->
  </div>
</template>

<style scoped></style>
