<script setup lang="ts">
import TodoAdd from '@/components/TodoAdd.vue';
import TodoList from '@/components/TodoList.vue';
</script>

<template>
  <div class="mt-2 mb-2 grid gap-4 md:mt-5 md:mb-5 lg:grid-cols-2 lg:grid-rows-2">
    <div class="relative lg:row-span-4">
      <TodoAdd />
    </div>
    <div class="relative lg:row-span-4">
      <TodoList />
    </div>
  </div>
</template>
