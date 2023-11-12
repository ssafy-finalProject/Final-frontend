<script setup>
import{ref,onMounted} from "vue";
import{initAndGetSidoList} from "@/api/map.js";
// export default {
//   data() {
//     return {
//       map: null,
//     };
//   },
//   methods: {
//     initMap() {
//       const container = document.getElementById("map");
//       const options = {
//         center: new kakao.maps.LatLng(37.2429362, 131.8624647, 16),
//         level: 5,
//       };
//       this.map = new kakao.maps.Map(container, options);
//     },
//   },
//   mounted() {
//     if (!window.kakao || !window.kakao.maps) {
//       const script = document.createElement("script");
//       script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
//       /* global kakao */
//       script.addEventListener("load", () => {
//         kakao.maps.load(this.initMap);
//       });
//       document.head.appendChild(script);
//     } else {
//       //console.log("이미 로딩됨: ", window.kakao);
//       this.initMap();
//     }
//   },
// };
let sidoCategories=ref([]);
let gugunCategories=ref([]);

//onMount에서 api 실행시켜서 리스트를 끌어와야지
onMounted(async()=>{
  initSidoPage();
})

const initSidoPage = async()=>{
  await initAndGetSidoList((success)=>{
    //console.log(success.data);
    sidoCategories=success.data;
    console.log(sidoCategories);
  },
  (fail)=>{
    console.log(fail);
  });
  //sidoCategories.value = response.data.
}

</script>

<template>
  <div>
    <h2 class="d-flex justify-content-center mt-3">지역 선택</h2>
    <!--시 군 구 start-->
    <div class="dropdown d-flex justify-content-center mt-3 mb-3">
      <select name="sido" id="sido" class="dropdown-toggle ms-3 me-3" required>
        <option value="" selected disabled hidden>시도선택</option>
          <option v-for="category in sidoCategories" :key="category.sido_code" :value="sido_name">
          {{ category.sido_name }} 
          </option>

      </select>
      <select
        name="gugun"
        id="gugun"
        class="dropdown-toggle ms-3 me-3"
        required
      ></select>
      <input
        type="text"
        id="info"
        placeholder="키워드 입력"
        style="margin: 0 25px 0 10px; width: 100px"
        required
      />
      <button onclick="loadMap()" id="search" name="search">검색</button>
    </div>
  </div>
  <!--kakao map start-->
  <!-- <div class="container">
    <div id="map" class="mt-3"></div> 
  </div> -->
</template>

<style scoped></style>
