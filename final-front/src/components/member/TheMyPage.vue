<script setup>
import { ref } from "vue";

const userInfo = ref({
  userid: "test",
  username: "testname",
  userpass: "1234",
});
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">마이페이지</mark>
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form id="form-join" method="POST" action="${root}/member/modify">
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input
              type="text"
              id="userid"
              class="form-control"
              name="userid"
              style="border: none; background: transparent"
              :value="userInfo.userid"
              disabled />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input
              type="text"
              id="username"
              class="form-control"
              name="username"
              style="background: transparent"
              :value="userInfo.username" />
          </div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              placeholder="비밀번호..."
              onchange="check_pw()"
              :value="userInfo.userpass"
              required />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호확인 : </label>
            <input
              type="password"
              class="form-control"
              id="pwdcheck"
              onchange="check_pw()"
              :value="userInfo.userpass"
              placeholder="비밀번호확인..."
              required />
          </div>
          <div id="msg2"></div>
          <div id="result-view" class="mb-3"></div>
          <div class="col-auto text-center">
            <button type="submit" id="btn-modify" class="btn btn-outline-primary mb-3">정보수정</button>
            <a href="${root}/member/delete" id="btn-delete" class="btn btn-outline-primary mb-3">회원탈퇴</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/myPage.css";
</style>
