<script setup>
import { ref, watch, onMounted } from "vue";
import { wholeArticle, getDetails, getCalendars, getArticle } from "@/api/board";
import GetKakaoMap from "@/components/map/GetKakaoMap.vue";
const { VITE_REST_API_URL } = import.meta.env;
const word = ref("");
const openedPanelKeys = ref([]);
const articles = ref([]);
const arr = ref(null);
const allInforms = ref([]);
const flag = ref(0);
let imageUrl = ref([]);
var markers = ref({
  arr: [],
}); // 시작지
var stopover = ref({
  arr: [],
}); // 경유지
var destination = ref({
  arr: [],
}); // 도착지

const boardArticle = ref({
  user_id: "",
  article_no: "",
  subject: "",
  content: "",
  register_time: "",
  hit: "",
  dtos: "",
});
//
onMounted(() => {
  // console.log("!!!markers.value.arr");
  // console.log(markers.value.arr);
  getArticleList();
});

//검색어에 아무것도 없을때는 전체리스트를 띄우고
//검색어에 뭔가있으면 해당 검색어를 detail의 placename으로 가지고 있는 board를 모두  띄운다.

const getArticleList = () => {
  // console.log(word.value);
  wholeArticle(
    word.value,
    ({ data }) => {
      //console.log(data);
      articles.value = data.articles;
      // console.log(articles.value);
    },
    (fail) => {
      // console.log(fail);
    }
  );
};

//리스트를 가져왔으니, 해당 article no의 파일이 뭐가 있었는지 따로 구해야된다

//또한 해당 articleno의 행선지가 무엇이 있었는지,
// 그리고 그것의 경도 위도를 구해와야한다.
const handleCollapseChange = (keys) => {
  const newOpenedPanelKey = keys[0]; // 현재 클릭한 패널의 key

  if (newOpenedPanelKey) {
    // 열린 패널이 있다면
    //console.log("방금 클릭해서 열린 패널의 key:", newOpenedPanelKey);

    // 기존에 열려있던 패널들의 key를 배열에서 제거
    openedPanelKeys.value = openedPanelKeys.value.filter((key) => key !== newOpenedPanelKey);

    // 방금 열린 패널의 key를 배열에 추가
    openedPanelKeys.value.push(newOpenedPanelKey);

    // 방금 열린 패널에 대한 처리 함수 실행
    handlePanelOpen(newOpenedPanelKey);
  }
};

const handlePanelOpen = (openedPanelKey) => {
  //console.log("패널이 열릴 때 실행할 함수. Key:", openedPanelKey);
  //console.log("실행중");
  //collape 누르는 순간 정보 얻어와야된다.
  imageUrl = ref([]);
  markers.value.arr = [];
  stopover.value.arr = [];
  destination.value.arr = [];
  flag.value = Number(new Date().getMilliseconds());
  getCalendars(
    openedPanelKey,
    ({ data }) => {
      arr.value = data;
    },
    (fail) => {
      console.log(fail);
    }
  );
  getDetails(
    openedPanelKey,
    ({ data }) => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].category === "시작지") {
          // markers.value = { ...data[i] };
          // console.log("!markers.value.arr");
          // console.log(markers.value.arr);
          // console.log(markers.value.arr.length);
          // console.log("data[i]");
          // console.log(data[i]);
          markers.value.arr.push(data[i]);
          // console.log(markers.value.arr);
        } else if (data[i].category === "경유지") {
          // stopover.value = { ...data[i] };
          stopover.value.arr.push(data[i]);
        } else if (data[i].category === "도착지") {
          // destination.value = { ...data[i] };
          destination.value.arr.push(data[i]);
        }
      }
      flag.value = Number(new Date().getMilliseconds());

      // console.log(markers.value.arr);
      // console.log(stopover.value.arr);
      // console.log(destination.value.arr);
      // console.log(data);
      // markers.value = data[0];
      // console.log(markers.value);
      // for (let i = 1; i < data.length - 1; i++) {
      //   stopover.value.add(data[i]);
      // }
      // console.log(stopover.value);
      // destination.value = data[data.length - 1];
      // console.log(destination.value);
    },
    (fail) => {
      // console.log(fail);
    }
  );
  getArticle(
    openedPanelKey,
    (success) => {
      boardArticle.value = success.data;
      if (boardArticle.value.dtos.length !== 0) {
        for (let i = 0; i < boardArticle.value.dtos.length; i++) {
          imageUrl.value.push(
            VITE_REST_API_URL +
              `/board/` +
              boardArticle.value.dtos[i].path +
              `/` +
              boardArticle.value.dtos[i].savedFileName
          );
        }
        console.log("이미지" + imageUrl.value);
      }
    },
    (fail) => {
      console.log(fail);
    }
  );
};
//

// console.log("실행중");
// //collape 누르는 순간 정보 얻어와야된다.
// getDetails(
//   key,
//   ({ data }) => {
//     console.log(data);
//     //allInforms.value = data.articles;
//     //console.log(articles.value);
//   },
//   (fail) => {
//     console.log(fail);
//   }
// );

//눌럿을때 펼쳐지는 이벤트
</script>

<template>
  <div class="container mt-5" style="display: flex">
    <GetKakaoMap :markers="markers" :stopover="stopover" :destination="destination" :flag="flag"> </GetKakaoMap>
    <div id="container">
      <div class="input-group input-group-sm">
        <input type="text" class="form-control" v-model="word" placeholder="검색어..." />
        <button class="btn btn-dark" type="button" @click="getArticleList">검색</button>
      </div>
      <div class="scroll-container" style="max-height: 650px; overflow-y: auto">
        <a-collapse class="mt-3" @change="handleCollapseChange">
          <a-collapse-panel accordion v-for="article in articles" :key="article.article_no">
            <template #header>
              <div class="custom-header">
                <div class="header-left">
                  <span>{{ article.subject }}</span>
                </div>
                <div class="header-right">
                  <span class="additional-text">좋아요 수 : {{ article.hit }}</span>
                </div>
              </div>
            </template>
            <div class="main_feed">
              <div class="feed_box">
                <div class="feed_name">
                  <span class="feed_name_txt"
                    ><h5>{{ article.subject }}</h5></span
                  >
                </div>

                <div v-for="(image, index) in imageUrl" :key="index" :class="{ active: index === 0 }">
                  <img :src="image" alt="main-img" />
                </div>
                <div class="feed_icon">
                  <div>
                    <span class="material-icons-outlined"> ♥좋아요</span>
                  </div>
                </div>
                <div class="feed_like">
                  <p class="feed_txt">
                    <b>좋아요 {{ article.hit }}개</b>
                  </p>
                </div>
                <div class="feed_content">
                  <p class="feed_txt">{{ article.content }}</p>
                </div>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
    <!--  -->

    <!--  -->
  </div>
  <div class="margin-bottom">
    <table>
      <thead>
        <tr>
          <th>날짜</th>
          <th>내용</th>
        </tr>
      </thead>
      <template v-if="arr && arr.length > 0">
        <tbody>
          <tr v-for="(item, index) in arr" :key="index">
            <td>{{ item.year }}년 {{ item.month }}월 {{ item.day }}일</td>
            <td>{{ item.memoContent }}</td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tr>
          <td colspan="2">데이터가 없습니다.</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<style scoped>
.margin-bottom {
  padding: 30px 0;
}

/* 공통 스타일 */
.feed-name,
.feed-like,
.feed-content,
.feed-reply {
  padding: 10px;
}

.feed-box {
  background-color: white;
  width: 480px;
  margin: 10px;
  min-height: auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 스타일 수정 */
.main-feed {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: #fafafa;
}

.feed-name {
  display: flex;
  align-items: center;
}

.feed-name-txt {
  padding: 5px 10px;
  font-weight: bold;
}

.feed-img {
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
  margin-top: 10px;
}

.feed-reply {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.feed-txt {
  font-size: 14px;
}

.feed-icon {
  padding: 10px 5px 0px 5px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

/* Container 스타일 수정 */
#container {
  width: 80%;
  padding: 20px;
}

/* GetKakaoMap 스타일 수정 */
GetKakaoMap {
  width: 70%;
}

/* 검색어 입력 부분 스타일 추가 */
.search-bar {
  margin-bottom: 20px;
}

/* Flex Container 스타일 추가 */
.flex-container {
  display: flex;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

img {
  width: 80%;
  height: 80%;
}
.custom-header {
  display: flex;
  justify-content: space-between;
}

.header-left {
  order: 1; /* 왼쪽에 위치하는 요소의 순서 */
}

.header-right {
  order: 2; /* 오른쪽에 위치하는 요소의 순서 */
}
</style>
