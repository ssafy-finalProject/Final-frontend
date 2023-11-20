<script setup>
import { ref } from "vue";
import { login } from "@/api/member";
import { useAuthStore} from '../../stores/userStore';
import { useRouter } from "vue-router";

//const cookie = ref(this.$cookies.get("userId"));
//console.log("쿠키왔나" + cookie);
const authStore = useAuthStore();
const {piniaUser,piniaLogin} = authStore;
const router = useRouter();

const loginUser = ref({
  userId: "",
  userName: "",
  userPass: "",
});

const onSubmit = () => {
  console.log("로그인 시도....");
  login(
    loginUser.value,
    loginUser.value.userId,
    (successMsg) => {
      console.log(successMsg);
      console.log("resdata : " + successMsg.data.resdata.userId);
      piniaLogin(successMsg.data.resdata);
      // localStorage.setItem("userinfo", JSON.stringify(successMsg.data.resdata));
      // console.log(JSON.parse(localStorage.getItem("userinfo")).userId);
    },
    (error) => {
      console.log(error);
      console.log("로그인실패!!");
    }
  );

  router.push("/");
};
</script>
<template>
  <main>
    <form id="loginForm" name="loginForm" @submit.prevent="onSubmit">
      <h1 class="loginText">로그인</h1>
      <div class="box">
        <div class="totalBox">
          <span class="titleText">아이디</span>
          <span class="inputBox">
            <input type="text" v-model="loginUser.userId" id="userid" name="userid" placeholder="ID 입력" required />
          </span>
        </div>
      </div>

      <div class="box">
        <div class="totalBox">
          <span class="titleText">비밀번호</span>
          <span class="inputBox"
            ><input
              type="password"
              v-model="loginUser.userPass"
              id="userpass"
              name="userpass"
              placeholder="비밀번호 입력"
              required />
          </span>
        </div>
      </div>
      <div class="form-group form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" name="remember" />
          아이디 기억하기
        </label>
      </div>
      <button type="submit" class="loginButton">로그인</button>

      <div class="moveNextPage">
        <ul style="align-center">
          <li>
            <router-link to="/register">
              <a href="">회원가입 하기</a>
            </router-link>
          </li>
          <li>
            <router-link to="/findPassword">
              <a href="">비밀번호 찾기</a>
            </router-link>
          </li>
        </ul>
      </div>
    </form>
  </main>
</template>

<style scoped>
@import "@/assets/css/login.css";
@import url("https://fonts.googleapis.com/css?family=Noto+Sans KR&display=swap");
</style>
