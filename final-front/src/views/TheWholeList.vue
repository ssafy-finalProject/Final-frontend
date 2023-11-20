<script setup>
import { ref, watch, onMounted } from "vue";
import { wholeArticle } from "@/api/board";
const word = ref(null);
//
onMounted (()=>{
    getArticleList();
});



//검색어에 아무것도 없을때는 전체리스트를 띄우고
//검색어에 뭔가있으면 해당 검색어를 detail의 placename으로 가지고 있는 board를 모두  띄운다.

const getArticleList = () => {
    console.log(word.value);
    wholeArticle(
    word.value,
    (success)=>{
        console.log(success);
    },
    (fail) => {
      console.log(fail);
    }
  );

}
</script>

<template>
    <div class="input-group input-group-sm">
            <input type="text" class="form-control" v-model="word" placeholder="검색어..." />
            <button class="btn btn-dark" type="button" @click="getArticleList">검색</button>
    </div>

    <a-collapse>
    <a-collapse-panel>
        <div class="main_feed">
    <div class="feed_box">
      <div class="feed_name">
        <span class="feed_name_txt"
          ><h5>
           제목제목
          </h5></span
        >
      </div>

      <!-- <img class="feed_img" :src="imagePath" alt="Uploaded Image" /> -->
      <div class="feed_icon">
        <div>
          <span class="material-icons-outlined"> 좋아요버튼</span>
        </div>
      </div>
      <div class="feed_like">
        <p class="feed_txt"><b>좋아요 10개</b></p>
      </div>
      <div class="feed_content">
        <p class="feed_txt">내용내용</p>
      </div>
      <!-- <div class="feed_reply">
          <span class="feed_txt"> <b> chew012 </b> 축하해 ~ </span>
          <span class="feed_txt"> <b> hoo486 </b> 멋찌다 ~ </span>
        </div> -->
    </div>
  </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped>

</style>