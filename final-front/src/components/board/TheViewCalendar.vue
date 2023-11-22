<script setup>
import { ref } from "vue";
import { getCalendars } from "@/api/board";

let number = ref(1);
const arr = ref(null);

const handleButtonClick = () => {
  console.log(number.value);
  getCalendars(
    number.value,
    ({ data }) => {
      console.log(data);
      arr.value = data;
      console.log(arr.value[0].day);
      console.log("길이" + arr.value.length);
      console.log("진짜?" + arr.value);
    },
    (fail) => {
      console.log(fail);
    }
  );
  number.value = number.value + 1;
};
</script>

<template>
  <div>
    <button @click="handleButtonClick">버튼 누르기</button>
    <div>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
          </tr>
        </thead>
        <template v-if="arr && arr.length > 0">
          <tbody>
            <tr v-for="(item, index) in arr" :key="index">
              <td>{{ item.year }}년 {{ item.month }}월 {{ item.day }}일</td>
              <td>{{ item.memoContent }}</td>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tr>
            <td colspan="2">데이터가 없습니다.</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
