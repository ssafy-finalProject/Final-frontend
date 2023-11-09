<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheMain from "./views/TheMain.vue";
import TheLogin from "./views/TheLogin.vue";
</script>

<template>
  <TheHeader></TheHeader>
  <TheLogin></TheLogin>
  <!-- <TheMain /> -->
  <!-- <RouterView></RouterView> -->
  <TheFooter></TheFooter>
</template>

<style scoped></style>
