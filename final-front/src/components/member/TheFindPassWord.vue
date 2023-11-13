<script setup>
import { ref, computed } from "vue";
import { findPass } from "@/api/member";
import { useRouter } from "vue-router";
const router = useRouter();

const pass = ref();

const loginUser = ref({
  userId: "",
  userName: "",
  userPass: "",
});

const onSubmit = () => {
  console.log("비번찾기 시도....");
  console.log("받은 아이디" + loginUser.value);
  console.log(loginUser.value.userId);
  console.log(loginUser.value.userName);
  findPass(
    loginUser.value.userId,
    loginUser.value.userName,
    (success) => {
      console.log(JSON.stringify(success.data.userPass));
      pass.value = success.data.userPass;
    },
    (fail) => {
      console.log(fail);
    }
  );
};
</script>

<template>
  <main>
    <form id="findPasswordForm" @submit.prevent="onSubmit">
      <h1 class="findPasswordText">비밀번호 찾기</h1>
      <div class="box">
        <div class="totalBox">
          <span class="titleText">아이디</span>
          <span class="inputBox">
            <input
              type="text"
              v-model="loginUser.userId"
              placeholder="아이디를 입력하세요."
              id="userid"
              class="id"
              name="userid"
              required />
          </span>
        </div>
      </div>
      <div class="box">
        <div class="totalBox">
          <span class="titleText">이름</span>
          <span class="inputBox">
            <input
              type="text"
              v-model="loginUser.userName"
              placeholder="이름을 입력하세요."
              id="name"
              class="name"
              name="name"
              required />
          </span>
        </div>
      </div>
      <div class="col-auto text-center">
        <button type="submit" id="btn-join" class="btn btn-outline-primary mb-3">찾기</button>
        <button type="reset" class="btn btn-outline-success mb-3">초기화</button>
      </div>
    </form>
    <div>비밀번호</div>
    <textarea readonly id="msg">{{ pass }}</textarea>
  </main>
</template>

<style scoped>
@import "@/assets/css/findPassword.css";
#msg {
  align-content: center;
}
</style>
