<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./components/member/TheLogin.vue";
</script>

<template>
  <div>
    <TheHeader></TheHeader>
    <router-view></router-view>
    <!-- <TheFooter></TheFooter> -->
  </div>
</template>

<style scoped></style>
