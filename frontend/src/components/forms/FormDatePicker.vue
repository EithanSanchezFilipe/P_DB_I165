<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue';
import {} from 'vue';
import { useDark } from '@vueuse/core';
// reduce bundle size by using defineAsyncComponent
const VueDatePicker = defineAsyncComponent(() => import('@vuepic/vue-datepicker'));

import '@vuepic/vue-datepicker/dist/main.css';

const isDark = useDark({
  selector: 'html',
  storageKey: 'vitepress-theme-appearance'
});

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  }
});

// disable past dates
const minDate = ref(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000));

// user's timezone
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue.toString() || null,
  set: (newValue) => emit('update:modelValue', newValue?.toString())
});
</script>

<template>
  <VueDatePicker
    v-model="value"
    auto-apply
    :dark="isDark"
    :timezone="timezone"
    :min-date="minDate"
    :enable-time-picker="false"
    :clearable="false"
    position="left"
    locale="fr"
    format="dd/MM/yyyy"
  >
    <template #dp-input="{ value, onInput }">
      <div class="flex flex-end items-baseline flex-row justify-start">
        <label
          :for="props.name"
          class="block mb-2 text-sm font-normal mr-2 w-[60px]"
          :class="error ? 'text-rose-700 dark:text-rose-700' : 'text-gray-900 dark:text-white'"
          >Pour le :</label
        >
        <input
          :id="props.name"
          :value="value"
          :name="props.name"
          :placeholder="props.placeholder"
          @input="onInput"
          type="text"
          class="border text-md rounded-lg w-[120px] p-2 block"
          :class="
            props.error
              ? 'bg-red-50 border-red-500 text-red-500 placeholder-red-500 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-rose-500 dark:placeholder-rose-500 dark:border-rose-500 dark:focus:ring-rose-700 dark:focus:border-rose-700'
              : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-700 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700'
          "
        />
      </div>
    </template>
  </VueDatePicker>
</template>

<style>
.dp__theme_dark {
  --dp-background-color: #374151;
  --dp-primary-color: #2563eb;
  --dp-hover-color: #a5a6a9;
  border-radius: 10px;
}
.dp__theme_light {
  --dp-primary-color: #2563eb;
  border-radius: 10px;
}
</style>
