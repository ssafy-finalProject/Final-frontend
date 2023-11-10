<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./components/member/TheLogin.vue";
import TheFindPassWord from "./components/member/TheFindPassWord.vue";
import TheJoin from "./components/member/TheJoin.vue";
import TheMyPage from "./components/member/TheMyPage.vue";
import TheBoardView from "./components/board/TheBoardView.vue";
import TheBoardWrite from "./components/board/TheBoardWrite.vue";
import TheBoardModify from "./components/board/TheBoardModify.vue";
</script>

<template>
  <TheHeader></TheHeader>
  <!-- <TheBoardModify></TheBoardModify> -->
  <!-- <TheBoardWrite></TheBoardWrite> -->
  <!-- <TheBoardView /> -->
  <!-- <TheMyPage></TheMyPage> -->
  <TheJoin></TheJoin>
  <!-- <TheFindPassWord></TheFindPassWord> -->
  <!-- <TheLogin></TheLogin> -->
  <!-- <TheMain /> -->
  <!-- <RouterView></RouterView> -->
  <TheFooter></TheFooter>
</template>

<style scoped></style>
