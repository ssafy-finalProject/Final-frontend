<script setup></script>

<template>
  <main>
    <form action="${root }/member/login" method="post" id="loginForm" name="loginForm">
      <h1 class="loginText">로그인</h1>
      <div class="box">
        <div class="totalBox">
          <span class="titleText">아이디</span>
          <span class="inputBox">
            <input
              type="text"
              id="userid"
              name="userid"
              placeholder="ID 입력"
              value="${cookie.userId.value}"
              required />
          </span>
        </div>
      </div>

      <div class="box">
        <div class="totalBox">
          <span class="titleText">비밀번호</span>
          <span class="inputBox"
            ><input type="password" id="userpass" name="userpass" placeholder="비밀번호 입력" required />
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
          <li><a href="${root }/member/join">회원가입 하기</a></li>
          <li><a href="${root }/member/findPassword">비밀번호 찾기</a></li>
        </ul>
      </div>
    </form>
  </main>
</template>

<style scoped></style>
