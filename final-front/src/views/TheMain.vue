<script setup>
import TheWholeList from "./TheWholeList.vue";
</script>

<template>
  <div class="container mt-3">
    <div id="demo" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators/dots -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
      </div>

      <!-- The slideshow/carousel -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@//assets/img/배너4.jpg" alt="Los Angeles" class="d-block w-80" />
        </div>
        <div class="carousel-item">
          <img src="@//assets/img/배너5.jpg" alt="Chicago" class="d-block w-80" />
        </div>
        <div class="carousel-item">
          <img src="@//assets/img/배너3.png" alt="New York" class="d-block w-80" />
        </div>
        <div class="carousel-item">
          <img src="@//assets/img/배너6.jpg" alt="New York" class="d-block w-80" />
        </div>
      </div>

      <!-- Left and right controls/icons -->
      <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
    <TheWholeList></TheWholeList>
    <!--Carousel End-->
  </div>
</template>

<style scoped></style>
