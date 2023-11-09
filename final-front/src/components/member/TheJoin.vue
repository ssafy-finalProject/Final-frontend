<script setup>
import { ref } from "vue";

const userInfo = ref({
  userId: "test",
  userName: "testname",
  userPwd: "1234",
});
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">회원가입</mark>
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form id="form-join" method="POST" action="${root }/member/join">
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input type="text" class="form-control" id="username" name="username" placeholder="이름..." required />
          </div>
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input type="text" class="form-control" id="userid" name="userid" placeholder="아이디..." required />
          </div>
          <div id="msg"></div>
          <div id="result-view" class="mb-3"></div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              class="form-control"
              id="userpass"
              name="userpass"
              placeholder="비밀번호..."
              onchange="check_pw()"
              required />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호확인 : </label>
            <input
              type="password"
              class="form-control"
              id="pwdcheck"
              onchange="check_pw()"
              placeholder="비밀번호확인..."
              required />
          </div>
          <div id="msg2"></div>

          <div class="col-auto text-center">
            <button type="submit" id="btn-join" class="btn btn-outline-primary mb-3">회원가입</button>
            <button type="reset" class="btn btn-outline-success mb-3">초기화</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#msg1,
#msg2 {
  align-content: center;
}
</style>
