<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {writeArticle} from "@/api/board2"
const router = useRouter();
let tempid = JSON.parse(localStorage.getItem("userinfo")).userId;
const boardArticle = ref({
  user_id: tempid,
  subject: "",
  content: "",
});

const onSubmit = () => {
  console.log("글 쓰기 시도....");
  console.log("받은 아이디 " + boardArticle.value.user_id);
  writeArticle(
    boardArticle.value,
    (successMsg) => {
      console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
  );
  router.push("list");
};

</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글쓰기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <form id="form-register" @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input type="text" v-model="boardArticle.subject" class="form-control" id="subject" name="subject" placeholder="제목..." />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">내용 : </label>
          <textarea class="form-control" v-model="boardArticle.content" id="content" name="content" rows="7"></textarea>
        </div>
        <div class="col-auto text-center">
          <!-- <button type="button" id="btn-register" class="btn btn-outline-primary mb-3">글작성</button> -->
          <button type="submit" id="btn-register" class="btn btn-outline-primary mb-3">글작성</button>
          <button type="reset" class="btn btn-outline-danger mb-3">초기화</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
