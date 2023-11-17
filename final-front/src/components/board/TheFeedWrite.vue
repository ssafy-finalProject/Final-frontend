<script setup>
import { ref } from "vue";
import { writeArticle } from "@/api/board";
let tempid = JSON.parse(localStorage.getItem("userinfo")).userId;
const feedArticle = ref({
  user_id: tempid,
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
  //무조건 글과 내용이 들어간 후에 사진업로드가 실행 되어야함
  let data = new FormData();
  data.append("user_id", feedArticle.value.user_id);
  data.append("subject", feedArticle.value.subject);
  data.append("content", feedArticle.value.content);
  Imagefiles.value.forEach((ele) => {
    data.append("files", ele);
  });
  writeArticle(
    data,
    (success) => {
      console.log(success);
    },
    (fail) => {
      console.log(fail);
    }
  );
};
</script>
<template>
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
        <button type="submit">업로드</button>
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

button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
