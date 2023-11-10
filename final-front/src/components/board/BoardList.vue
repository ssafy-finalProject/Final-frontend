<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const articles = [
  { articleno: 5, username: 'test', subject: '5번글 입니다.', registerTime: '23.11.08' },
  { articleno: 4, username: 'test', subject: '4번글 입니다.', registerTime: '23.11.08' },
  { articleno: 3, username: 'test', subject: '3번글 입니다.', registerTime: '23.11.08' },
  { articleno: 2, username: 'test', subject: '2번글 입니다.', registerTime: '23.11.08' },
  { articleno: 1, username: 'test', subject: '1번글 입니다.', registerTime: '23.11.08' },
];

</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>