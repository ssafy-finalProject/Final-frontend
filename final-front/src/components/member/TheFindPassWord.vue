<script setup></script>

<template>
  <main>
    <form id="findPasswordForm" name="findPasswordForm" method="POST">
      <h1 class="findPasswordText">비밀번호 찾기</h1>
      <div class="box">
        <div class="totalBox">
          <span class="titleText">아이디</span>
          <span class="inputBox">
            <input type="text" placeholder="아이디를 입력하세요." id="userid" class="id" name="userid" />
          </span>
        </div>
      </div>
      <div class="box">
        <div class="totalBox">
          <span class="titleText">이름</span>
          <span class="inputBox">
            <input type="text" placeholder="이름을 입력하세요." id="name" class="name" name="name" />
          </span>
        </div>
      </div>
    </form>
    <div id="msg"></div>
  </main>
</template>

<style scoped>
@import "@/assets/css/findPassword.css";
#msg {
  align-content: center;
}
</style>
