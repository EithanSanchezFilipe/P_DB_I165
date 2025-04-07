<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';

import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { useUser } from '@/shared/stores';

interface Props {
  isAuthenticated?: boolean;
  menu: Array<{ name: string; path: string; display: boolean }>;
}

const { isAuthenticated, menu } = defineProps<Props>();
const userStore = useUser();

const logout = () => {
  userStore.logout();
};

const imgUrlLogo = new URL('../assets/todo.png', import.meta.url).href;
const imgUrlProfile = new URL('../assets/funny-smile.png', import.meta.url).href;
</script>

<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Ouvrir le menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <RouterLink to="/" class="flex"
              ><img class="h-8 w-auto" :src="imgUrlLogo" />
              <h1 class="text-white text-2xl font-bold">Todo</h1></RouterLink
            >
          </div>
          <div class="hidden sm:ml-6 sm:block" v-for="item in menu" :key="item.name">
            <template v-if="item.display">
              <div class="flex space-x-4">
                <a
                  :href="item.path"
                  :class="[
                    $route.path === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  ]"
                  :aria-current="$route.path === item.path ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
            </template>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <ThemeSwitcher />
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3 profile-menu" v-if="isAuthenticated">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Ouvrir le menu</span>
                <img class="h-8 w-8 rounded-full" :src="imgUrlProfile" alt="Profile" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="/profile"
                    :class="[active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700']"
                  >
                    <UserIcon class="h-5 w-5" />
                    Mon Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    @click="logout"
                    :class="[active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700']"
                  >
                    <ArrowRightStartOnRectangleIcon class="h-5 w-5" />
                    Déconnexion</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2" v-for="item in menu" :key="item.name">
        <template v-if="item.display">
          <DisclosureButton
            as="a"
            :href="item.path"
            :class="[
              $route.path === item.path
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            ]"
            :aria-current="$route.path === item.path ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </template>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped lang="scss">
.profile-menu {
  .menu-item {
    width: 100%;
  }
  svg {
    width: 20px;
    margin-right: 5px;
  }
}
h1 {
  margin-left: 10px;
}
</style>
