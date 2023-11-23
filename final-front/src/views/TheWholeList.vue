<script setup>
import { ref, watch, onMounted } from "vue";
import {
  wholeArticle,
  getDetails,
  getCalendars,
  getArticle,
} from "@/api/board";
import GetKakaoMap from "@/components/map/GetKakaoMap.vue";
const { VITE_REST_API_URL } = import.meta.env;
const word = ref("");
const openedPanelKey = ref(null);
const articles = ref([]);
const arr = ref(null);
const allInforms = ref([]);
const flag = ref(0);
let imageUrl = ref([]);
var markers = ref({
  arr: [],
});
var stopover = ref({
  arr: [],
});
var destination = ref({
  arr: [],
});
const boardArticle = ref({
  user_id: "",
  article_no: "",
  subject: "",
  content: "",
  register_time: "",
  hit: "",
  dtos: "",
});

onMounted(() => {
  getArticleList();
});

const getArticleList = () => {
  wholeArticle(
    word.value,
    ({ data }) => {
      articles.value = data.articles;
    },
    (fail) => {
      console.log(fail);
    }
  );
};

const handleCollapseChange = (key) => {
  // 이전에 열려있던 패널의 정보를 가져오기
  const currentPanelInfo = openedPanelKey.value
    ? openedPanelKey.value[0]
    : null;

  // 새로 열린 패널의 정보로 업데이트
  openedPanelKey.value = [key];

  // 이전에 열려있던 패널과 현재 열린 패널이 다르다면, 새로운 정보로 요청 보내기
  if (currentPanelInfo !== key) {
    handlePanelOpen();
  }
};

const handlePanelOpen = () => {
  imageUrl.value = [];
  markers.value.arr = [];
  stopover.value.arr = [];
  destination.value.arr = [];
  flag.value = Number(new Date().getMilliseconds());

  getCalendars(
    openedPanelKey.value,
    ({ data }) => {
      arr.value = data;
    },
    (fail) => {
      console.log(fail);
    }
  );

  getDetails(
    openedPanelKey.value,
    ({ data }) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].category === "시작지") {
          markers.value.arr.push(data[i]);
        } else if (data[i].category === "경유지") {
          stopover.value.arr.push(data[i]);
        } else if (data[i].category === "도착지") {
          destination.value.arr.push(data[i]);
        }
      }
      flag.value = Number(new Date().getMilliseconds());
    },
    (fail) => {
      console.log(fail);
    }
  );

  getArticle(
    openedPanelKey.value,
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
      }
    },
    (fail) => {
      console.log(fail);
    }
  );
};
</script>

<template>
  <div class="container mt-5" style="display: flex">
    <GetKakaoMap
      :markers="markers"
      :stopover="stopover"
      :destination="destination"
      :flag="flag"
    >
    </GetKakaoMap>
    <div id="container">
      <div class="input-group input-group-sm">
        <input
          type="text"
          class="form-control"
          v-model="word"
          placeholder="검색어..."
        />
        <button class="btn btn-dark" type="button" @click="getArticleList">
          검색
        </button>
      </div>
      <div class="scroll-container" style="max-height: 650px; overflow-y: auto">
        <a-collapse class="mt-3" @change="handleCollapseChange">
          <a-collapse-panel
            accordion
            v-for="article in articles"
            :key="article.article_no"
          >
            <template #header>
              <div class="custom-header">
                <div class="header-left">
                  <span>{{ article.subject }}</span>
                </div>
                <div class="header-right">
                  <span class="additional-text"
                    >좋아요 수 : {{ article.hit }}</span
                  >
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

                <div
                  v-for="(image, index) in imageUrl"
                  :key="index"
                  :class="{ active: index === 0 }"
                >
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
