<script setup>
import { ref, onMounted } from "vue";
const currentDate = ref(new Date());
const currentMonthYear = ref("");
const calendar = ref([]);

const generateCalendar = function (year, month) {
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();

  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  const lastMonthLastDay = new Date(year, month, 0);
  const lastMonthTotalDays = lastMonthLastDay.getDate();

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
          <td v-for="(day, dayIndex) in week" :key="dayIndex" :class="{ inactive: day.inactive }">
            {{ day.day !== "" ? day.day : "" }}
          </td>
        </tr>
      </tbody>
    </table>
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
</style>
