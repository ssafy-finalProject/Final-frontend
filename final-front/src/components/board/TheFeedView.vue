<script setup>
//내용들 db에서 다 불러오기
import { RestAxios } from "@/util/http-commons";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticle } from "@/api/board";
const boardArticle = ref({
  user_id: "",
  article_no: "",
  subject: "",
  content: "",
  register_time: "",
  hit: "",
  dtos: "",
});
//dto는 백에서 넘긴 list<filedto>
const router = useRouter();
const route = useRoute();
boardArticle.article_no = route.params.no;

const imageUrl = ref([]);
const imagePath = ref("");
const Rest = RestAxios();
onMounted(async () => {
  const successCallback = (success) => {
    console.log(success.data);
    boardArticle.value = success.data;
    console.log(boardArticle.value.subject);

    if (boardArticle.value.dtos.length !== 0) {
      console.log("이프이프");
      console.log("패쓰:" + boardArticle.value.dtos[0].path);
      //사진받아오기
      // const response = Rest.get(
      //   "/board/" + boardArticle.value.dtos[0].path + "/" + boardArticle.value.dtos[0].originalFileName
      // );
      //imagePath = response.data.url;
      // for (let i = 0; i < boardArticle.value.dtos.length; i++) {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     imageUrl.value[i] = e.target.result;
      //   };
      //   reader.readAsDataURL(boardArticle.value.dtos[i].path);
      // }
    }
  };

  const errorCallback = (fail) => {
    console.log(fail);
  };

  await getArticle(6, successCallback, errorCallback);

  // await getArticle(
  //   33,
  //   //route.params.no,
  //   (success) => {
  //     console.log(success.data);
  //     boardArticle.value = success.data;
  //     console.log(boardArticle.value.subject);
  //     console.log("패쓰:" + boardArticle.value.dtos[0].path);
  //   },
  //   (fail) => {
  //     console.log(fail);
  //   }
  // );
  // if (boardArticle.value.dtos.length != 0) {
  //   console.log("이프이프");
  //   for (let i = 0; i < boardArticle.value.dtos.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       imageUrl.value[i] = e.target.result;
  //     };
  //     reader.readAsDataURL(boardArticle.value.dtos[i].path);
  //   }
  // }
});
</script>

<template>
  <!-- feed -->
  <div class="main_feed">
    <div class="feed_box">
      <div class="feed_name">
        <span class="feed_name_txt"
          ><h5>
            {{ boardArticle.subject }}
          </h5></span
        >
      </div>

      <img class="feed_img" :src="imagePath" alt="Uploaded Image" />
      <div class="feed_icon">
        <div>
          <span class="material-icons-outlined"> 좋아요버튼</span>
        </div>
      </div>
      <div class="feed_like">
        <p class="feed_txt"><b>좋아요 10개</b></p>
      </div>
      <div class="feed_content">
        <p class="feed_txt">{{ boardArticle.content }}</p>
      </div>
      <!-- <div class="feed_reply">
          <span class="feed_txt"> <b> chew012 </b> 축하해 ~ </span>
          <span class="feed_txt"> <b> hoo486 </b> 멋찌다 ~ </span>
        </div> -->
    </div>
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
</style>
