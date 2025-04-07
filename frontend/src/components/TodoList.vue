<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodo } from '@/shared/stores';
import TodoItem from './TodoItem.vue';
import AppSpinner from './AppSpinner.vue';

const todoStore = useTodo();
const { allTodo, loaded } = storeToRefs(todoStore);

onMounted(async () => await todoStore.fetchAllTodo());

const query = ref('');

const searchTodo = async () => {
  if (query.value !== '') {
    try {
      await todoStore.fetchSearchTodo(query.value);
    } catch (e) {
      console.log(e);
    }
  } else {
    await todoStore.fetchAllTodo();
  }
};

const clearSearchTodo = async () => {
  if (query.value !== '') {
    query.value = '';
    await todoStore.fetchAllTodo();
  }
};
</script>

<template>
  <div
    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <div class="flex justify-between items-center">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Mes tâches
        </h1>
        <form class="w-2/3">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              v-model="query"
              @input="searchTodo"
              type="text"
              placeholder="Rechercher ..."
              class="w-full border text-md rounded-lg pl-8 pr-2.5 py-2 block bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-700 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700"
            />
            <button
              type="button"
              @click="clearSearchTodo"
              class="close-button absolute top-[.3rem] right-2 size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-primary-700 dark:focus:bg-primary-700"
            >
              <svg
                class="text-gray-500 dark:text-gray-400"
                fill="currentColor"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 41.756 41.756"
                xml:space="preserve"
                stroke="none"
              >
                <g stroke-width="0"></g>
                <g stroke-linecap="round" stroke-linejoin="round"></g>
                <g>
                  <g>
                    <path
                      d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465 c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071 C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343 c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <template v-if="!loaded">
        <AppSpinner />
      </template>
      <template v-else>
        <ul role="list" class="mt-2 flex flex-col list-none">
          <li v-for="todo in allTodo" :key="todo.id">
            <TodoItem
              :todoId="Number(todo.id)"
              :todoDate="todo.date.toString()"
              :todoCompleted="todo.completed"
              :todoText="todo.text"
            />
          </li>
          <li
            class="flex items-center justify-between py-4 pr-5 text-md text-grey-900 dark:text-white leading-6"
            v-if="todoStore.allTodo && todoStore.allTodo.length === 0"
          >
            Aucune tâche ...
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped>
.close-button svg {
  width: 0.8rem;
  height: 0.8rem;
}
</style>
