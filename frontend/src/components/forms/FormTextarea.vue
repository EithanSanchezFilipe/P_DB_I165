<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = defineProps({
  rows: {
    type: Number,
    default: 4
  },
  value: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange
} = useField(name, undefined, {
  initialValue: props.value
});
</script>

<template>
  <label
    v-if="label"
    :for="props.name"
    class="block mb-2 text-sm font-medium"
    :class="errorMessage ? 'text-rose-700 dark:text-rose-700' : 'text-gray-900 dark:text-white'"
    >{{ props.label }}</label
  >
  <textarea
    :value="inputValue"
    :name="name"
    :rows="rows"
    @input="handleChange"
    @blur="handleBlur"
    class="border test-sm rounded-lg w-full p-2.5 block"
    :class="
      errorMessage
        ? 'bg-red-50 border-red-500 text-red-500 placeholder-red-500 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-rose-500 dark:placeholder-rose-500 dark:border-rose-500 dark:focus:ring-rose-700 dark:focus:border-rose-700'
        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-700 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700'
    "
  ></textarea>
  <p v-if="errorMessage" class="pt-1 text-sm text-red-500 dark:text-rose-500">{{ errorMessage }}</p>
</template>

<style scoped></style>
