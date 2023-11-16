<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./components/member/TheLogin.vue";
import TheMap from "./components/map/TheMap.vue";
import KakaoMap from "./views/KakaoMap.vue";
import TheBoardWrite from "./components/board/TheBoardWrite.vue";
import TheBoardView from "./components/board/TheBoardView.vue";
import TheFeedViewTest from "./components/board/TheFeedViewTest.vue";
</script>

<template>
  <div>
    <TheHeader></TheHeader>
    <TheFeedViewTest></TheFeedViewTest>
    <!-- <TheBoardView/> -->
    <!-- <TheBoardWrite/> -->
    <!-- <TheMap></TheMap> -->
    <!-- <KakaoMap></KakaoMap> -->
    <!-- <router-view></router-view> -->
    <!-- <TheFooter></TheFooter> -->
  </div>
</template>

<style scoped></style>
