<template>
  <div class="my-2 w-full">
    <label
      for="element"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <input
      :type="inputType"
      id="element"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[6px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String || Number,
    default: "Name",
  },
  inputType: {
    type: String,
    default: "string",
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});
defineEmits(["update:modelValue"]);

// const emit = defineEmits(["on-change"]);

// const inputVal = ref(props.modelValue);

// watch(
//   () => inputVal.value,
//   (val) => {
//     emit("update:modelValue", val);
//   }
// );

// const inputVal = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(value) {
//     emit("update:modelValue", value);
//   },
// });
</script>
