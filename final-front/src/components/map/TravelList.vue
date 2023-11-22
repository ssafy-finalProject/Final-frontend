<script lang="ts" setup>
import { ref, onMounted } from "vue";

const { markers, stopover, destination } = defineProps({
  markers: Array,
  stopover: Array,
  destination: Array,
}); // defineProps로 가져온 배열들을 ref처럼 사용하려면 {}를 사용해야 한다.

onMounted(() => {
  console.log(stopover);
});

const activeKey = ref([]);
const emit = defineEmits();

const changeActivekey = (key: string) => {
  console.log(key);
};

const sendDataList = () => {
  console.log(markers, stopover, destination); // markers, stopover, destination 정보들을 보낸다.
  emit("send-list", {}); // parent 배열에 3개의 인자값을 보내줘야 할 필요가 없다?
};

const removeStopover = (stop) => {
  // stopover 배열에서 해당 항목을 제거
  console.log(stopover.length);
  emit("remove-stopover", stop);
};
// removeStopover를 부모로 올려보내야 한다. 코드 수정이 필요.
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" @change="changeActivekey">

    <a-collapse-panel key="1" header="시작점">
      <div v-for="marker in markers" :key="marker.id">  
        <p>{{ marker.place_name }}</p>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="경유지">
      <div v-for="stop in stopover" :key="stop.id">
        <p>
          {{ stop.place_name }}
          <button class="remove" @click="() => removeStopover(stop)">X</button>
        </p>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="도착지">
      <div v-for="dest in destination" :key="dest.id">
        <p>{{ dest.place_name }}</p>
      </div>
    </a-collapse-panel>
    <button @click="sendDataList" id="detection">결정</button>
  </a-collapse>
</template>

<style scoped>
button {
  background-color: white;
  border-radius: 10px;
  padding: 1px 8px
}

.remove {
  /* border-color: red;
  color: red; */
  border: none;
  background-color:crimson;
  color: white;
  border-radius: 5px;
}

#detection {
  margin: 20px;
  font-weight: bold;
  font-size: 30px;
}
</style>
