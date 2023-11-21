<script setup>
import { ref, watch, onMounted } from "vue";
import { wholeArticle, getDetails } from "@/api/board";
import GetKakaoMap from "@/components/map/GetKakaoMap.vue";
const word = ref("");
const openedPanelKeys = ref([]);
const articles = ref([]);

const allInforms = ref([]);
const flag = ref(0);

var markers = ref([]); // 시작지
var stopover = ref([]); // 경유지
var destination = ref([]); // 도착지

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
  getArticleList();
});

//검색어에 아무것도 없을때는 전체리스트를 띄우고
//검색어에 뭔가있으면 해당 검색어를 detail의 placename으로 가지고 있는 board를 모두  띄운다.

const getArticleList = () => {
  console.log(word.value);
  wholeArticle(
    word.value,
    ({ data }) => {
      //console.log(data);
      articles.value = data.articles;
      // console.log(articles.value);
    },
    (fail) => {
      console.log(fail);
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
    openedPanelKeys.value = openedPanelKeys.value.filter(
      (key) => key !== newOpenedPanelKey
    );

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

  markers.value = [];
  stopover.value = [];
  destination.value = [];
  flag.value = (Number)(new Date().getMilliseconds());

  getDetails(
    openedPanelKey,
    ({ data }) => {
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].category === "시작지") {
          // markers.value = { ...data[i] };
          markers.value.push(data[i]);
        } else if (data[i].category === "경유지") {
          // stopover.value = { ...data[i] };
          stopover.value.push(data[i]);
        } else if (data[i].category === "도착지") {
          // destination.value = { ...data[i] };
          destination.value.push(data[i]);
        }
      }
      flag.value = (Number)(new Date().getMilliseconds());

      console.log(markers.value);
      console.log(stopover.value);
      console.log(destination.value);
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
    <GetKakaoMap :markers="markers" :stopover="stopover" :destination="destination" :flag="flag">
    </GetKakaoMap>
    <div id="container" >
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

      <a-collapse class="mt-3" @change="handleCollapseChange">
        <a-collapse-panel
          accordion
          v-for="article in articles"
          :key="article.article_no"
        >
          <template #header>
            <div class="custom-header">
              <span>{{ article.subject }}</span>
              <span class="additional-text">좋아요 수 : {{ article.hit }}</span>
            </div>
          </template>
          <div class="main_feed">
            <div class="feed_box">
              <div class="feed_name">
                <span class="feed_name_txt"
                  ><h5>{{ article.subject }}</h5></span
                >
              </div>

              <img class="feed_img" src="" alt="Uploaded Image" />
              <div class="feed_icon">
                <div>
                  <span class="material-icons-outlined"> 좋아요버튼</span>
                </div>
              </div>
              <div class="feed_like">
                <p class="feed_txt"><b>좋아요 10개</b></p>
              </div>
              <div class="feed_content">
                <p class="feed_txt">{{ article.content }}</p>
              </div>
              <div class="feed_reply">
                <span class="feed_txt"> <b> chew012 </b> 축하해 ~ </span>
                <span class="feed_txt"> <b> hoo486 </b> 멋찌다 ~ </span>
              </div>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<style scoped>
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
</style>
