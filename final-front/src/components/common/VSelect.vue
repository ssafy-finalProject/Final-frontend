<script setup>
import { ref } from "vue";
defineProps({ selectOption: Array });
const emit = defineEmits(["onKeySelect"]);

const onSelect = () => {
  console.log(key.value + "선택!!!");
  emit("onKeySelect", key.value);
};

const key = ref("");
</script>

<template>
  <select
    v-model="key"
    class="form-select form-select-sm ms-5 me-1 w-50"
    @change="onSelect"
  >
    <option
      v-for="option in selectOption"
      :key="option.value"
      :value="option.value"
      :disabled="option.value === '' ? true : false"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped></style>
