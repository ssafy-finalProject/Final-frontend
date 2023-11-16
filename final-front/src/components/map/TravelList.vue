<script lang="ts" setup>
import { ref } from "vue";

defineProps({ marker: Object });

const activeKey = ref([]);
const text = `몰라 테스트중임 ㅅㄱ`;

const changeActivekey = (key: string) => {
  console.log(key);
};
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" @change="changeActivekey">
    <a-collapse-panel key="1" header="시작점">
      <a-collapse default-active-key="4">
        <a-collapse-panel key="4" header="넣을 패널">
          <p>{{ marker }}</p>
        </a-collapse-panel>
      </a-collapse>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="경유지">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="도착지">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped></style>
