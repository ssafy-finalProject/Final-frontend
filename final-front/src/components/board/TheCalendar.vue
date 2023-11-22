<script setup>
import { ref, onMounted } from "vue";
const currentDate = ref(new Date());
const currentMonthYear = ref("");
const calendar = ref([]);
const selectedDate = ref(null);
const memo = ref("");

const realMonth = ref();
const realDay = ref();

const generateCalendar = function (year, month) {
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();

  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  const lastMonthLastDay = new Date(year, month, 0);
  const lastMonthTotalDays = lastMonthLastDay.getDate();

  selectedDate.value = ref(null);
  memo.value = "";

  let dayCount = 1;
  let calendarData = [];

  for (let i = 0; i < 6; i++) {
    let week = [];

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        week.push({ day: "", inactive: true });
      } else if (dayCount <= totalDays) {
        week.push({ day: dayCount, inactive: false });
        dayCount++;
      } else {
        week.push({ day: "", inactive: true });
      }
    }

    calendarData.push(week);
  }

  currentMonthYear.value = `${year}년 ${month + 1}월`;
  calendar.value = calendarData;

  realMonth.value = month + 1;
};

const previousMonth = function () {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1);
  updateCalendar();
};

const nextMonth = function () {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1);
  updateCalendar();
};

const updateCalendar = function () {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  generateCalendar(year, month);
};

onMounted(() => {
  updateCalendar();
});

const showModal = ref(false);

const handleDateClick = function (day) {
  console.log("클릭이벤트!! 클릭날짜: " + day);
  selectedDate.value = day;
  showModal.value = true;
};

const closeAndSaveMemo = function () {
  // 모달에서 메모 저장 등의 작업 수행
  console.log(`메모 추가: ${selectedDate.value} - ${memo.value}`);

  // 모달 닫기
  showModal.value = false;

  // 메모 입력 필드 초기화
  memo.value = "";
};
</script>

<template>
  <div>
    <div class="month-navigation">
      <button @click="previousMonth">이전 달</button>
      <h2>{{ currentMonthYear }}</h2>
      <button @click="nextMonth">다음 달</button>
    </div>

    <table id="calendar">
      <thead>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendar" :key="index">
          <td
            v-for="(day, dayIndex) in week"
            :key="dayIndex"
            :class="{ inactive: day.inactive }"
            @click="handleDateClick(day.day)">
            {{ day.day !== "" ? day.day : "" }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <p>{{ realMonth }}월 {{ selectedDate }}일의 메모</p>
        <textarea v-model="memo"></textarea>
        <button @click="closeAndSaveMemo">저장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.month-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.month-navigation button {
  padding: 5px 10px;
  cursor: pointer;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
