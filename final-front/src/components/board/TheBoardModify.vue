<script setup>
import { ref, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import {getArticle} from "@/api/board2"
const boardArticle = ref({
  user_id:"",
  article_no: "",
  subject: "",
  content:"",
  register_time:"",
  hit:"",

});
const router=useRouter();
const route = useRoute();
//console.log(route.params.no);
boardArticle.article_no = route.params.no;
onMounted(()=>{
  getArticle(route.params.no,
  (success)=>{
    console.log(success.data);
    boardArticle.value = success.data;
    console.log(boardArticle.value.subject);
  },
  (fail)=>{
    console.log(fail);
  })
});

</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글수정</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <form id="form-modify" method="POST" action="">
        <input type="hidden" name="action" value="modify" />
        <input type="hidden" name="articleno" value="${article.articleNo}" />
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input type="text" class="form-control" id="subject" name="subject" v-model="boardArticle.subject" />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">내용 : </label>
          <textarea class="form-control" id="content" name="content" rows="7" >{{boardArticle.content}}</textarea>
        </div>
        <div class="col-auto text-center">
          <button type="button" id="btn-modify" class="btn btn-outline-primary mb-3">글수정</button>
          <router-link to="/board">
          <button type="button" id="btn-list" class="btn btn-outline-danger mb-3">목록으로이동...</button>
        </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
