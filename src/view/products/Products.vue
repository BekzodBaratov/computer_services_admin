<template>
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-gray-700 text-3xl font-medium">Product bo'limi</h3>
    <router-link to="/product_add" class="btn btn-gray cursor-pointer"
      >Yangi product qo'shish</router-link
    >
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="p-4">#:</th>
          <th scope="col" class="p-4">Rasmi</th>
          <th scope="col" class="px-6 py-3">Nomi</th>
          <th scope="col" class="px-6 py-3">Rangi</th>
          <th scope="col" class="px-6 py-3">Kategoriya</th>
          <th scope="col" class="px-6 py-3">Vaziyati</th>
          <th scope="col" class="px-6 py-3">Qo'shilgan vaqti</th>
          <th scope="col" class="px-6 py-3">Narxi</th>
          <th scope="col" class="px-6 py-3">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(item, index) in productsList"
          :key="index"
        >
          <td class="w-4 p-4">
            <p class="font-bold">{{ index + 1 }}.</p>
          </td>
          <td class="w-4 p-4">
            <img
              :src="item?.image_url"
              alt="images"
              class="w-[50px] h-[40px] object-cover"
            />
          </td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item?.name }}
          </th>
          <td class="px-6 py-4">
            {{ item?.product_detail?.colors }}
          </td>
          <td class="px-6 py-4">
            {{ item?.category?.name }}
          </td>
          <td class="px-6 py-4">
            {{ item.product_detail?.condition ? "Bor" : "Yo`q" }}
          </td>
          <td class="px-6 py-4">
            {{ formatDate(item.createdAt) }}
          </td>
          <td class="px-6 py-4">
            {{ numberFunction(item.product_detail?.price) }} UZS
          </td>

          <td class="flex items-center px-6 py-4 space-x-4">
            <router-link
              :to="`/products/${item.id}`"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              ><i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i
            ></router-link>
            <div
              class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
              @click="productDelete(item?.id)"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :is-open="openModal"
              @delete="fetchDelete"
              @closeModal="openModal = $event"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../../helpers/formatNumber";
import formatDate from "../../helpers/formatDate";

import DeleteModal from "../../components/modal/DeleteModal.vue";
const openModal = ref(false);

const toast = useToast();
const productsList = ref([]);
const deleteId = ref(null);

const fetchProductsList = () => {
  axios({
    method: "GET",
    url: "/products",
    withCredentials: true,
  }).then((res) => {
    productsList.value = res.data.data.products;
  });
};

function fetchDelete(emit) {
  const isDelete = ref(false);
  isDelete.value = emit;
  if (isDelete.value) {
    const params = {
      headers: {},
      withCredentials: true,
    };
    axios
      .delete(`products/${deleteId.value}`, { params })
      .then((res) => {
        toast.success("Mahsulot muvaffaqiyatli o'chirildi");
        fetchProductsList();
      })
      .catch((res) => {
        toast.error("Xatolik yuz berdi");
      });
  }
}

const productDelete = (id) => {
  openModal.value = true;
  deleteId.value = id;
};

onMounted(() => {
  fetchProductsList();
});
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
