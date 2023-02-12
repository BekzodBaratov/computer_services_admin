<template>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ placeholder }}</label>
    <textarea id="password" v-model="inputVal" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[6px] resize-none h-[200px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">

    </textarea>
  </div>
</template>

<script setup>

import {ref,watch} from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },

  placeholder:{
    type : String,
  }
});

const emit = defineEmits(["on-change"])

const inputVal = ref(props.modelValue)

watch(() => inputVal.value,
    (val) =>{
      emit("update:modelValue", val)
    }
)

</script>