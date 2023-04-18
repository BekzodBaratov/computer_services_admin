<template>
  <div
    v-cloak
    :class="sidebarOpen ? 'block' : 'hidden'"
    @click="emit('closeSidebar')"
    class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
  ></div>

  <div
    v-cloak
    :class="
      sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
    "
    class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center justify-center mt-8">
      <div class="flex items-center">
        <svg
          class="w-12 h-12"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="#4C51BF"
            stroke="#4C51BF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          />
        </svg>

        <span class="mx-2 text-2xl font-semibold text-white">Dashboard</span>
      </div>
    </div>

    <nav class="mt-10">
      <RouterLink
        @click="handleNav('/')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="
          '/' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'
        "
        to="/"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
        <span class="mx-3">Dashboard</span>
      </RouterLink>

      <RouterLink
        @click="handleNav('/order')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="
          '/order' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'
        "
        to="/order"
      >
        <svg
          class="h-6 w-6 text-white"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>

        <span class="mx-3">Buyurtmalar</span>
      </RouterLink>

      <RouterLink
        @click="handleNav('/products')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="
          '/products'
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
        to="/products"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>

        <span class="mx-3">Products</span>
      </RouterLink>
      <RouterLink
        @click="handleNav('/services')"
        class="flex items-center px-6 py-2 mt-4 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="
          `${route.path === '/service'}`
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
        to="/services"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
        <span class="mx-3">Services</span>
      </RouterLink>

      <RouterLink
        @click="handleNav('/categories')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="
          '/categories'
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
        to="/categories"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>

        <span class="mx-3">Kategoriya</span>
      </RouterLink>

      <RouterLink
        @click="handleNav('/configuration')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="
          '/configuration'
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
        to="/configuration"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>

        <span class="mx-3">Configuration</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["closeSidebar"]);
const props = defineProps(["sidebarOpen"]);
</script>

<style scoped>
.router-link-active {
  @apply text-gray-100 bg-opacity-25 bg-gray-700;
}
</style>
