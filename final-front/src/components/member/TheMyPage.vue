<script setup>
import { ref,onMounted } from "vue";
import { modifyMember,getMember,deleteMember } from "@/api/member";
import { useRouter } from "vue-router";
import { useAuthStore} from '../../stores/userStore';
const authStore = useAuthStore();
const {piniaUser} = authStore;
const router = useRouter();
const loginUser = ref({
  userId: "",
  userName: "",
  userPass: "",
});


onMounted(()=>{
  getMember(piniaUser.userId,
  (successMsg) => {
      let tmp2 = JSON.stringify(successMsg.data);
      console.log(tmp2);
      loginUser.value.userId = JSON.parse(tmp2).userId;
      loginUser.value.userName = JSON.parse(tmp2).userName;
      loginUser.value.userPass = JSON.parse(tmp2).userPass;
    },
    (error) => {
      console.log(error);
    })
});

const canSubmit = ref(true);
const check_pw = (e) => {
  let pass = loginUser.value.userPass;
  let passcheck = e.target.value;
  console.log(e.target.value);
  if (pass != passcheck) {
    canSubmit.value = true;
  } else {
    canSubmit.value = false;
  }
}
const onSubmit = () => {
  console.log("회원정보 수정 시도....");
  modifyMember(
    loginUser.value.userId,
    loginUser.value,
    (successMsg) => {
      console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
  );
  router.push("/");
};

const deleteMem = ()=>{
  console.log("회원탈퇴 시도")
  console.log(loginUser.value.userId);
  deleteMember(loginUser.value.userId,
  (successMsg) => {
      console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
    );
    router.push("/");
}

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
        <form id="form-join" @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input
              type="text"
              v-model="loginUser.userName"
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
              v-model="loginUser.userId"
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
              v-model="loginUser.userPass"
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
          <div id="result-view" class="mb-3"></div>
          <div class="col-auto text-center">
            <button type="submit" id="btn-modify" class="btn btn-outline-primary mb-3" :disabled="canSubmit">정보수정</button>
            <button type ="button" id="btn-delete" class="btn btn-outline-primary mb-3" @click="deleteMem">회원탈퇴</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/myPage.css";
</style>
