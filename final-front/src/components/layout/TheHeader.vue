<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/userStore";
const authStore = useAuthStore();
const { piniaUser, piniaLogout } = authStore;

onMounted(() => {
  //console.log("현재 로그인 정보는" + piniaUser.value.userId);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-li ght navbar-light">
    <div class="container">
      <a class="navbar-brand">
        <router-link :to="{ name: 'main' }">
          <img src="@/assets/img/main_logo.png" alt="" />
        </router-link>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="#">공지사항</a></li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="${root}/article/list?pgno=1&key=&word="> -->
            <!-- <a class="nav-link"> <router-link :to="{ name: 'board' }"> 여행지 추천 </router-link></a> -->
          </li>
          <li class="nav-item"><a class="nav-link" href="#">여행 후기</a></li>
          <li class="nav-item">
            <a class="nav-link" href="${root}/enjoytrip/newpage">지역별 검색</a>
          </li>
        </ul>
        <!-- <c:choose>
        <c:when test="${empty userInfo.userId }"> -->
        <ul v-if="!piniaUser.isLoginned" class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login" class="text-decoration-none">
              <a class="nav-link">로그인</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="text-decoration-none">
              <a class="nav-link">회원가입</a>
            </router-link>
          </li>
        </ul>
        <!-- </c:when> -->

        <!-- <c:otherwise> -->
        <ul v-else class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link disabled"
              >{{ piniaUser.userId }}님 반갑습니다.</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="piniaLogout">로그아웃</a>
          </li>
          <li class="nav-item">
            <router-link to="/mypage" class="text-decoration-none">
              <a class="nav-link">마이페이지</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/myfeed" class="text-decoration-none">
              <a class="nav-link">나의 게시글</a>
            </router-link>
            <!-- <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">회원 관리</a></li>
              <li><a class="dropdown-item" href="#">게시물 관리</a></li>
            </ul> -->
          </li>
        </ul>
        <!-- </c:otherwise>
      </c:choose> -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
img {
  width: 120px;
}
@import "@/assets/css/style.css";
</style>
