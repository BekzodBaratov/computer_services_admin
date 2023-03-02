<template>
  <div class="w-full flex justify-end my-2 mb-4">
    <router-link to="/service_add" class="btn btn-gray cursor-pointer">Yangi service qo'shish</router-link>
   </div>
  <div class="">
    <!-- <pre>{{ serviceList }}</pre> -->
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
    
         <th scope="col" class="p-4">
           Rasmi
         </th>
         <th scope="col" class="px-6 py-3">
           Service
         </th>
  
      
         
       
         <th scope="col" class="px-6 py-3 ">
           Tel raqam:
         </th>

         <th scope="col" class="px-6 py-3  text-left">
           Muommolar
         </th>
         <th scope="col" class="px-6 py-3 text-left">
          features
         </th>

         <th scope="col" class="px-6 py-3 ">
           Qisqacha
         </th>

         <th scope="col" class="px-6 py-3 ">
           Qo'shilgan vaqti
         </th>
      
         <th scope="col" class="px-6 py-3">
           Amallar
         </th>
       </tr>
       </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="item,index in serviceList" :key="index">
     
         <td class="w-4 p-4">
           <img :src="item.image_url" alt="images" class="w-full h-full">
         </td>
         <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{item.name}}
         </th>
       

          <th scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
           {{item?.phone}}
          </th>

          <th scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white flex justify-start">
           <ul class="text-left">
            <li v-for="el,index in item.resolve_problems" :key="el"><span class="font-medium">{{ index+1 }}. &nbsp;</span>{{el}}</li>
           </ul>
          </th>
          <th scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white  justify-start">
           <ul class="text-left">
            <li v-for="el,index in item.features" :key="el"><span class="font-medium">{{ index+1 }}. &nbsp;</span>{{el}}</li>
           </ul>
          </th>

          <th scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
           {{item?.description}}
          </th>

          <td class="px-6 py-4">
           {{ formatDate(item.createdAt) }}
          </td>
    
         <td class=" px-6 py-4 ">
          <div class="flex gap-4">
            <router-link to="" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i></router-link>
            <div class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" @click="productDelete(item.id)"><i class="fa-solid fa-trash text-[red] text-[20px]"></i></div>
          </div>
         </td>
       </tr>
            </tbody>
          </table>
          <!-- <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span class="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>

            <div class="inline-flex mt-2 xs:mt-0">
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div> -->
        </div>
      </div>
    
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
 const serviceList = ref([])
 
 const fetchProductsList = () =>{
   axios({
     method : "GET",
     url : "/services",
     withCredentials: true,
   }).then((res) =>{
     serviceList.value = res.data.data.services
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
       url: `services/${id}`,
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
 