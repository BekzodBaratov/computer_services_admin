<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Buyurtmalar</h3>
    <div class="mt-4">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="p-4">Rasmi</th>
                <th scope="col" class="px-6 py-3">Ismi</th>
                <th scope="col" class="px-6 py-3">Telefon raqami:</th>

                <th scope="col" class="px-6 py-3 text-left">Buyurtmalar</th>

                <th scope="col" class="px-6 py-3">Buyurtma vaqti</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                v-for="(item, index) in serviceList"
                :key="index"
              >
                <td class="w-4 p-4">
                  <img
                    :src="item.image_url"
                    alt="images"
                    class="w-full h-[40px]"
                  />
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ item.name }}
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ item?.phone }}
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white flex justify-start"
                >
                  <ul class="text-left">
                    <li v-for="(el, index) in item.resolve_problems" :key="el">
                      <span class="font-medium">{{ index + 1 }}. &nbsp;</span
                      >{{ el }}
                    </li>
                  </ul>
                </th>

                <td class="px-6 py-4 text-center">
                  {{ formatDate(item.createdAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../helpers/formatNumber";
import formatDate from "../helpers/formatDate";

import DeleteModal from "../components/modal/DeleteModal.vue";
const openModal = ref(false);
const deleteId = ref(null);

const toast = useToast();
const serviceList = ref([]);

const fetchProductsList = () => {
  axios({
    method: "GET",
    url: "/services",
    withCredentials: true,
  }).then((res) => {
    serviceList.value = res.data.data.services;
  });
};

function fetchDelete(emit) {
  if (emit) {
    const params = {
      headers: {},
      withCredentials: true,
    };
    axios
      .delete(`services/${deleteId.value}`, { params })
      .then((res) => {
        toast.success("Service muvaffaqiyatli o'chirildi");
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
