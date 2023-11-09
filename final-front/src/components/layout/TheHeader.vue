<script setup></script>

<template>
  <div class="container">
    <a class="navbar-brand" href="#">
      <img width="120px" src="@/assets/img/logo2.png" alt="" />
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
          <a class="nav-link" href="${root}/article/list?pgno=1&key=&word="
            >여행지 추천</a
          >
        </li>
        <li class="nav-item"><a class="nav-link" href="#">여행 후기</a></li>
        <li class="nav-item">
          <a class="nav-link" href="${root}/enjoytrip/newpage">지역별 검색</a>
        </li>
      </ul>
      <!-- <c:choose>
        <c:when test="${empty userInfo.userId }"> -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="${root}/member/login">로그인</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${root}/member/join">회원가입</a>
        </li>
      </ul>
      <!-- </c:when> -->

      <!-- <c:otherwise> -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link disabled">${userInfo.userId}님 반갑습니다.</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${root}/member/logout">로그아웃</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${root}/member/mypage">마이페이지</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            >관리자</a
          >
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">회원 관리</a></li>
            <li><a class="dropdown-item" href="#">게시물 관리</a></li>
          </ul>
        </li>
      </ul>
      <!-- </c:otherwise>
      </c:choose> -->
    </div>
  </div>
</template>

<style scoped></style>
