<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./components/member/TheLogin.vue";
import TheFindPassWord from "./components/member/TheFindPassWord.vue";
import TheJoin from "./components/member/TheJoin.vue";
import TheMyPage from "./components/member/TheMyPage.vue";
</script>

<template>
  <TheHeader></TheHeader>
  <TheMyPage></TheMyPage>
  <!-- <TheJoin></TheJoin> -->
  <!-- <TheFindPassWord></TheFindPassWord> -->
  <!-- <TheLogin></TheLogin> -->
  <!-- <TheMain /> -->
  <!-- <RouterView></RouterView> -->
  <TheFooter></TheFooter>
</template>

<style scoped></style>
