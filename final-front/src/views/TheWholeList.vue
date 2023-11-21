<script setup>
import { ref, watch, onMounted } from "vue";
import { wholeArticle, getDetails } from "@/api/board";
import GetKakaoMap from "@/components/map/GetKakaoMap.vue";
const word = ref("");
const openedPanelKeys = ref([]);
const articles = ref([]);

const allInforms = ref([]);

let markers = ref([]); // 시작지
let stopover = ref([]); // 경유지
let destination = ref([]); // 도착지

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
      //console.log(articles.value);
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

  getDetails(
    openedPanelKey,
    ({ data }) => {
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].category === "시작지") {
          markers.value = { ...data[i] };
        } else if (data[i].category === "경유지") {
          stopover.value = { ...data[i] };
        } else if (data[i].category === "도착지") {
          destination.value = { ...data[i] };
        }
      }
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
  <GetKakaoMap></GetKakaoMap>
  <div id="container" container-fluid>
    <div class="input-group input-group-sm">
      <input type="text" class="form-control" v-model="word" placeholder="검색어..." />
      <button class="btn btn-dark" type="button" @click="getArticleList">검색</button>
    </div>

    <a-collapse @change="handleCollapseChange">
      <a-collapse-panel accordion v-for="article in articles" :key="article.article_no">
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
            <!-- <div class="feed_reply">
          <span class="feed_txt"> <b> chew012 </b> 축하해 ~ </span>
          <span class="feed_txt"> <b> hoo486 </b> 멋찌다 ~ </span>
        </div> -->
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<style scoped>
.main_feed {
  display: flex;
  justify-content: center;
  padding-top: 0px;
  background-color: #fafafa;
}

.feed_name {
  padding: 10px;
  display: flex;
  align-items: center;
}

.feed_name_txt {
  padding: 5px 10px;
  font-weight: bold;
}
.feed_box {
  background-color: white;
  width: 480px;
  margin: 10px;
  min-height: auto;
  padding-bottom: 10px;
}

.feed_img {
  width: 100%;
  object-fit: contain;
}

.feed_content {
  padding: 0px 10px;
}

.feed_like {
  padding: 0px 10px;
}

.feed_reply {
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
}

.feed_txt {
  font-size: 14px;
}

.feed_icon {
  padding: 5px 5px 0px 5px;
  display: flex;
  justify-content: space-between;
}
span {
  padding-right: 5px;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#container {
  display: flex;
  width: 20%;
}
</style>
