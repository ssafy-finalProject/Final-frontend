<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./components/member/TheLogin.vue";
import KakaoMap from "./views/KakaoMap.vue";
import TheBoardWrite from "./components/board/TheBoardWrite.vue";
import TheBoardView from "./components/board/TheBoardView.vue";
import TheFeedWrite from "./components/board/TheFeedWrite.vue";
import TheFeedView from "./components/board/TheFeedView.vue";
import TheFeedMyList from "./components/board/TheFeedMyList.vue";
</script>

<template>
  <div>
    <TheHeader></TheHeader>
    <!-- <KakaoMap></KakaoMap> -->
    <!-- <TheBoardView/> -->
    <!-- <TheBoardWrite /> -->
    <!-- <TheFeedWrite></TheFeedWrite> -->
    <!-- <TheMap></TheMap> -->
    <!-- <KakaoMap></KakaoMap> -->
    <router-view></router-view>
    <!-- <TheFooter></TheFooter> -->
  </div>
</template>

<style scoped></style>
