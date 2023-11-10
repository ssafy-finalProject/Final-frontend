<script setup>
import { ref } from "vue";
// import { registerMember } from "@/api/member";
import { useRouter } from "vue-router";

const router = useRouter();

const joinUser = ref({
  userid: "",
  username: "",
  userpass: "",
});

const canSubmit = ref(true);

const check_pw = (e) => {
  let pass = joinUser.value.userpass;
  let passcheck = e.target.value;
  console.log(e.target.value);
  if (pass != passcheck) {
    canSubmit.value = true;
  } else {
    canSubmit.value = false;
  }
  // if (document.getElementById("userpwd").value != "" && document.getElementById("pwdcheck").value != "") {
  //   if (document.getElementById("userpwd").value == document.getElementById("pwdcheck").value) {
  //     document.getElementById("msg2").innerHTML = "비밀번호가 일치합니다.";
  //     document.getElementById("msg2").style.color = "blue";
  //     target.disabled = false;
  //   } else {
  //     document.getElementById("msg2").innerHTML = "비밀번호가 일치하지 않습니다.";
  //     document.getElementById("msg2").style.color = "red";
  //     target.disabled = true;
  //   }
  // }
};

const onSubmit = () => {
  //console.log("회원가입 시도....");
  //console.log("받은 아이디" + joinUser.value.userid);
  registerMember(
    joinUser.value,
    (successMsg) => {
      console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
  );
};
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
        <form id="form-join" @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input
              type="text"
              v-model="joinUser.username"
              class="form-control"
              id="username"
              name="username"
              placeholder="이름..."
              required />
          </div>
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input
              type="text"
              v-model="joinUser.userid"
              class="form-control"
              id="userid"
              name="userid"
              placeholder="아이디..."
              required />
          </div>
          <div id="msg"></div>
          <div id="result-view" class="mb-3"></div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              v-model="joinUser.userpass"
              class="form-control"
              id="userpass"
              name="userpass"
              placeholder="비밀번호..."
              required />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호확인 : </label>
            <input
              type="password"
              class="form-control"
              id="pwdcheck"
              @input="check_pw"
              placeholder="비밀번호확인..."
              required />
          </div>
          <div id="msg2"></div>

          <div class="col-auto text-center">
            <button type="submit" id="btn-join" class="btn btn-outline-primary mb-3" :disabled="canSubmit">
              회원가입
            </button>
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
