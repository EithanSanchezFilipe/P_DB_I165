<script setup lang="ts">
const year = new Date().getFullYear();
</script>
<template>
  <footer class="border-t border-gray-200 dark:border-gray-700 sticky bottom-0 top-[100vh]">
    <div class="mx-4 items-centers grid grid-cols-1 justify-between gap-4 py-4 md:grid-cols-2">
      <p class="order-2 sm:order-1 text-sm/6 text-slate-600 dark:text-gray-400 max-md:text-center">
        ©
        <!-- -->{{ year
        }}<!-- -->
        Matinfo Labs. Tout droits réserver.
      </p>
      <div
        class="order-1 sm:order-2 flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end dark:text-white"
      >
        <a
          href="/privacy-policy"
          class="text-gray-700 dark:text-gray-400 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-700 rounded-md px-2 py-1 text-sm font-medium"
        >
          Politique de confidentialité
        </a>
        <div class="h-4 w-px bg-gray-300 dark:bg-gray-700 space-x-1"></div>
        <a
          href="https://github.com/matinfo/todo-app-mysql"
          class="text-gray-700 dark:text-gray-400 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-700 rounded-md px-2 py-1 text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.682-.103-.253-.446-1.27.098-2.645 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.91-1.296 2.75-1.026 2.75-1.026.544 1.375.201 2.392.099 2.645.64.699 1.028 1.591 1.028 2.682 0 3.842-2.337 4.687-4.566 4.936.36.31.68.92.68 1.852 0 1.337-.012 2.415-.012 2.743 0 .268.18.579.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
