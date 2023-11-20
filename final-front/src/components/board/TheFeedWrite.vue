<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { writeArticle } from "@/api/board";
import { useAuthStore } from "../../stores/userStore";
import TravelList from "@/components/map/TravelList.vue";
var map;
var realData = ref([]);
let polyline;
const searchKeyword = ref("");
const markers = ref([]); // 시작지
const stopover = ref([]); // 경유지
const destination = ref([]); // 도착지

const authStore = useAuthStore();
const { piniaUser } = authStore;
const router = useRouter();
const feedArticle = ref({
  user_id: piniaUser.userId,
  article_no: "",
  subject: "",
  content: "",
});

const Imagefiles = ref([]);

const imageUrl = ref([]);

const handleFileChange = (event) => {
  imageUrl.value.length = 0;
  // 파일이 변경될 때마다 selectedFiles 배열 업데이트
  Imagefiles.value = Array.from(event.target.files);
  if (Imagefiles.value.length != 0) {
    for (let i = 0; i < Imagefiles.value.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl.value[i] = e.target.result;
      };
      reader.readAsDataURL(Imagefiles.value[i]);
    }
  }
};

const onSubmit = () => {
  console.log("게시글 업로드중!");
  console.log("넘길 유저 아이디 " + feedArticle.value.user_id);
  console.log("넘길 제목 " + feedArticle.value.subject);
  console.log("넘길 내용 " + feedArticle.value.content);
  Imagefiles.value.forEach((ele) => {
    console.log("넘길 파일 " + ele);
  });
  console.log();

  const dataToSend = ref({
    markers: transformData(markers, "시작지"),
    stopover: transformData(stopover, "경유지"),
    destination: transformData(destination, "도착지"),
  });
  //무조건 글과 내용이 들어간 후에 사진업로드가 실행 되어야함
  let data = new FormData();
  data.append("user_id", feedArticle.value.user_id);
  data.append("subject", feedArticle.value.subject);
  data.append("content", feedArticle.value.content);
  Imagefiles.value.forEach((ele) => {
    data.append("files", ele);
  });
  data.append("dataToSend", JSON.stringify(dataToSend.value));

  writeArticle(
    data,
    (success) => {
      console.log(success);
    },
    (fail) => {
      console.log(fail);
    }
  );
  //router.push("myfeed");
};

const requestSend = () => {
  // const dataToSend = {
  //   markers: transformData(markers, "시작지"),
  //   stopover: transformData(stopover, "경유지"),
  //   destination: transformData(destination, "도착지"),
  // }; // api 스펙은 place_name, latitude, longitude, category로 설정됨.

  // let data = new FormData();
  // console.log(dataToSend.markers);
  // // console.log(dataToSend.stopover);
  // // console.log(dataToSend.destination);
  // data.append('markers', dataToSend.markers);
  // data.append('stopover', dataToSend.stopover);
  // data.append('destination', dataToSend.destination);

  registerDetail(
    dataToSend,
    (successMsg) => {
      console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
  );
};

// 부모가 자식의 이벤트 처리에 대한 listen 처리
const listenList = () => {
  // polyline이 그려져 있으면 값을 비운다.
  if (polyline) {
    polyline.setMap(null);
    console.log(polyline);
  }
  // 배열 비우기
  // markers.value = [...newMarkers];
  // stopover.value = [...newStopover];
  // destination.value = [...newDestination];
  console.log(markers, stopover, destination);

  var linePath = [];

  linePath.push(new kakao.maps.LatLng(markers.value[0].y, markers.value[0].x));
  for (let i = 0; i < stopover.value.length; i++) {
    linePath.push(new kakao.maps.LatLng(stopover.value[i].y, stopover.value[i].x));
  }
  linePath.push(new kakao.maps.LatLng(destination.value[0].y, destination.value[0].x));
  console.log("좌표 값들: " + linePath);
  // 지도에 표시할 선을 생성합니다
  polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FFAE00", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });
  console.log(polyline);
  // 지도에 선을 표시합니다
  polyline.setMap(map);
  // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
}; // 기존의 배열 값을 전부 비우고, emit 받은 값들로 전부 replace 한다.

// data Conversion 의 필요성을 가지고, 작성하는 함수
const transformData = (data, type) => {
  if (data.value.length === 1) {
    return [
      {
        place_name: data.value[0].place_name,
        latitude: parseFloat(data.value[0].y),
        longitude: parseFloat(data.value[0].x),
        category: type,
      },
    ];
  } else {
    return data.value.map((item) => ({
      place_name: item.place_name,
      latitude: parseFloat(item.y),
      longitude: parseFloat(item.x),
      category: type,
    }));
  }
}; // detailDto에 대한 수정이 필요

const removeStopover = (stop) => {
  const index = stopover.value.indexOf(stop);
  if (index !== -1) {
    stopover.value.splice(index, 1);
  }
};

var ps;
var infowindow;

const searchPlaces = () => {
  ps.keywordSearch(searchKeyword.value, placesSearchCB);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.500613, 127.036431),
    level: 5,
  };

  map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
};

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var bounds = new kakao.maps.LatLngBounds();
    realData = data;

    for (var i = 0; i < data.length; i++) {
      // console.log(data[i]);
      // console.log(realData[i]);
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

function sendMarkerInfo(place, type) {
  if (type === "출발지") {
    if (markers.value.length === 1) {
      markers.value.pop();
    }
    markers.value.push(place);
    console.log(markers);
  } else if (type === "경유지") {
    stopover.value.push(place);
    console.log(stopover);
  } else {
    if (destination.value.length === 1) {
      destination.value.pop();
    }
    destination.value.push(place);
    console.log(destination);
  }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(`
      <div class="infowindow-container">
        <div style="margin-bottom: 5px;">${place.place_name}</div>
        <div class="infowindow-buttons">
          <button id="infoBtn" onclick="sendMarkerInfoHandler(${place.id}, '출발지')">출발지</button>
          <button id="midBtn" onclick="sendMarkerInfoHandler(${place.id}, '경유지')">경유지</button>
          <button id="lastBtn" onclick="sendMarkerInfoHandler(${place.id}, '도착지')">도착지</button>
        </div>
      </div>
    `);

    infowindow.open(map, marker);
  });

  // 클릭 이벤트 핸들러 추가 ( 시작지, 경유지, 도착지에 따른 값을 type으로 받고, 받은 type들을 통해서,
  // 함수들의 배열값들을 달리 넣어준다. 시작지는 markers, 경유지는 stopover, 도착지는 destination에 넣는다.
  window.sendMarkerInfoHandler = function (id, type) {
    // console.log(`${type} 선택: ${type}`);
    if (type === "출발지") {
      for (let i = 0; i < realData.length; i++) {
        if (realData[i].id == id) {
          console.log("현재 찾은 도시이름: " + realData[i].address_name);
          sendMarkerInfo(realData[i], type);
        }
      }
    } else if (type === "경유지") {
      for (let i = 0; i < realData.length; i++) {
        if (realData[i].id == id) {
          console.log("현재 찾은 도시이름: " + realData[i].address_name);
          sendMarkerInfo(realData[i], type);
        }
      }
    } else {
      for (let i = 0; i < realData.length; i++) {
        if (realData[i].id == id) {
          console.log("현재 찾은 도시이름: " + realData[i].address_name);
          sendMarkerInfo(realData[i], type);
        }
      }
    }
  };
}
</script>
<template>
  <div class="container">
    <div id="search">
      <input v-model="searchKeyword" placeholder="장소를 검색하세요." />
      <button @click="searchPlaces">검색</button>
    </div>
    <div class="container-fluid row">
      <div id="map" class="col-8"></div>
      <TravelList
        :markers="markers"
        :stopover="stopover"
        :destination="destination"
        class="col-4"
        @send-list="listenList"
        @remove-stopover="removeStopover" />
      <!--자식에서 부모에게 send-list라는 이벤트를 발생했는데, 그걸 listen을 통해서 듣고 잇다가, 발생하면 이제 함수 처리한다.-->
    </div>
    <button id="determine" @click="requestSend">최종 결정</button>
    <!-- 최종 결정을 눌렀을 때에, 현재의 시작지, 경유지, 도착지를 기준으로 post로 서버에 보내준다.-->
  </div>

  <div class="rightPage">
    <form class="upload-form" @submit.prevent="onSubmit">
      <div class="upload-container">
        <div class="form-group">
          <span for="title">제목:</span>
          <textarea id="title" name="title" required rows="1" v-model="feedArticle.subject"></textarea>
        </div>
        <h4>사진 업로드</h4>
        <div class="form-group">
          <div v-for="(url, index) in imageUrl" :key="index">
            <img :src="url" alt="Preview" style="max-width: 50%; max-height: 150px" />
          </div>
          <label for="image">이미지 선택:</label>
          <input
            type="file"
            id="image"
            multiple="multiple"
            name="image"
            accept="image/*"
            @change="handleFileChange"
            required />
        </div>

        <div class="form-group">
          <label for="contents">내용:</label>
          <textarea id="contents" name="contents" rows="4" v-model="feedArticle.content" required></textarea>
        </div>
        <button type="submit" id="upload">업로드</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
div.rightpage {
  float: right;
}

.upload-container {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 20px;
}

.upload-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

#title {
  width: 100%;
  height: 20%;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button#upload {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
}

#search {
  width: 100%;
  padding: 10px;
}

#map {
  height: 700px;
}
.infowindow-container {
  max-width: 300px; /* Adjust the maximum width as needed */
  padding: 10px;
  text-align: center;
}

.infowindow-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.infowindow-buttons button {
  flex-grow: 1;
  margin: 0 2px;
}

#determine {
  margin: 2px;
  width: 90px;
  justify-content: center;
  float: right;
}
</style>
