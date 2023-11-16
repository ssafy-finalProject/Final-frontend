<script setup>
import { ref } from "vue";
import { writeArticle, getMaxArticle } from "@/api/board";
let tempid = JSON.parse(localStorage.getItem("userinfo")).userId;
const feedArticle = ref({
  user_id: tempid,
  article_no: "",
  subject: "",
  content: "",
});

const Imagefiles = ref([]);

const handleFileChange = (event) => {
  // 파일이 변경될 때마다 selectedFiles 배열 업데이트
  Imagefiles.value = Array.from(event.target.files);
  // for (let i = 0; i < Imagefiles.value.length; i++) {
  //   console.log(Imagefiles.value[i]);
  // }
};

const onSubmit = async () => {
  console.log("게시글 업로드중!");

  //무조건 글과 내용이 들어간 후에 사진업로드가 실행 되어야함
  await writeArticle(
    feedArticle.value,
    (successMsg) => {
      console.log("hi");
      //console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
  );

  await getMaxArticle(
    (successMsg) => {
      console.log("hihi");
      console.log("최대값은" + successMsg.data);
      feedArticle.value.article_no = successMsg.data;
      console.log("맥스에선 들어갔다" + feedArticle.value.article_no);
    },
    (error) => {
      console.log(error);
    }
  );
  //router.push("list");
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
