<template>
  <!-- <pre>{{productsList}}</pre> -->
 
    <!-- modal -->
    <div id="popup-modal"
     class="fixed  top-0 hidden items-center justify-center  z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full h-[100vh] ">
     <div class="relative w-full h-full max-w-md md:h-auto mx-auto ">
       <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
 
         <div class="p-6 text-center">
           <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>
           <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Haqiqatdan ham bu mahsulotni o'chirmoqchimisiz?</h3>
           <button id="agree"
             class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
             Ha,men roziman
           </button>
           <button id="cancel"
             class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Yoq,
             Bekor qilish</button>
         </div>
       </div>
     </div>
   </div>
 
   <div class="w-full flex justify-end my-2 mb-4">
    <router-link to="/product_add" class="btn btn-gray cursor-pointer">Yangi product qo'shish</router-link>
   </div>

   <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
       <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
         <th scope="col" class="p-4">
           ID:
         </th>
         <th scope="col" class="p-4">
           Rasmi
         </th>
         <th scope="col" class="px-6 py-3">
           Nomi
         </th>
         <th scope="col" class="px-6 py-3">
           Rangi
         </th>
         <!-- <th scope="col" class="px-6 py-3">
           Kategoriya ID
         </th> -->
         <th scope="col" class="px-6 py-3">
           Vaziyati
         </th>
         <th scope="col" class="px-6 py-3">
           Qo'shilgan vaqti
         </th>
         <th scope="col" class="px-6 py-3">
           Narxi
         </th>
         <th scope="col" class="px-6 py-3">
           Amallar
         </th>
       </tr>
       </thead>
       <tbody>
       <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="item,index in productsList" :key="index">
         <td class="w-4 p-4">
           <p class="font-bold">{{ item.id }}.</p>
         </td>
         <td class="w-4 p-4">
           <img :src="item.image_url" alt="images" class="w-[50px] h-[40px] object-cover">
         </td>
         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{item.name}}
         </th>
         <td class="px-6 py-4">
           {{item.product_detail.colors}}
         </td>
         <!-- <td class="px-6 py-4">
           {{item.categoryId}}
         </td> -->
         <td class="px-6 py-4">
           {{item.product_detail.condition ? 'Bor' : 'Yo`q'}}
         </td>
         <td class="px-6 py-4">
           {{ formatDate(item.createdAt) }}
         </td>
         <td class="px-6 py-4">
           {{numberFunction(item.product_detail.price)}} UZS
         </td>
  
         <td class="flex items-center px-6 py-4 space-x-4">
           <router-link to="" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i></router-link>
           <div class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" @click="productDelete(item.id)"><i class="fa-solid fa-trash text-[red] text-[20px]"></i></div>
         </td>
       </tr>
      
       </tbody>
     </table>
   </div>
 
 </template>
 
 <script setup>
 import axios from "axios";
 import {onMounted} from "@vue/runtime-core";
 import {ref} from "vue";
 import { useToast } from "vue-toastification";
 import  numberFunction  from "../../helpers/formatNumber";
 import formatDate from "../../helpers/formatDate";
 
 const toast = useToast()
 const productsList = ref([])
 
 const fetchProductsList = () =>{
   axios({
     method : "GET",
     url : "/products",
     withCredentials: true,
   }).then((res) =>{
     productsList.value = res.data.data.products
   })
 }
 
 const productDelete = (id) =>{
 
   const modal = document.getElementById("popup-modal");
   const agree = document.getElementById("agree");
   const cancel = document.getElementById("cancel")
   modal.classList.add('modal-class')
 
   cancel.addEventListener("click", () => {
     modal.classList.remove('modal-class')
   })
 
   const reallyDelete = () => {
     modal.classList.remove('modal-class')
     axios({
       methods: "DELETE",
       url: `products/${id}`,
       headers: {},
       withCredentials: true,
     }).then((res) => {
       console.log(res)
       toast.success(res.data.message)
     })
   }
 
   agree.addEventListener("click", reallyDelete)
 }
 
 onMounted(() => {
   fetchProductsList()
 })
 </script>
 
 <style scoped>
 .modal-class {
   overflow: visible;
   display: flex;
   backdrop-filter: blur(6px);
 }
 </style>