<template>

  <form method="POST">

    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
      <input type="text" id="password" v-model="form.name"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
      <input type="number" id="password" v-model="form.price"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
      <input type="text" id="password" v-model="form.description"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">colors</label>
      <input type="text" id="password" v-model="form.colors"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">colors</label>
      <input type="text" id="password" v-model="form.condition"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
    </div>



    <label class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload
      file</label>
    <input
      class="block mb-6  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      aria-describedby="user_avatar_help" id="user_avatar" type="file" ref="file" @change="getFile($event)">




    <button type="submit" @click="handleSubmit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save
      a new product</button>
  </form>

</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast()



const form = reactive({
  category_id: 1,
  name: "",
  description: "",
  condition: "",
  price: "",
  imageFiles: "",
  colors: "",
  specifications: [
    {
      name: "Valisher"
    },
    {
      name: "Bekzod"
    }
  ]


})

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.imageFiles) {
    let formData = new FormData();
    formData.append('imageFiles', form.imageFiles);
    formData.append('category_id', form.category_id);
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('condition', form.condition);
    formData.append('colors', form.colors);
    formData.append('specifications', form.specifications);
    fetchData(formData)

  }
}


const getFile = (event) => {
  form.imageFiles = event.target.files[0];
}

const fetchData = (data) => {
  axios({
    method: "POST",
    url: "products",
    withCredentials: true,
    data: data,
  }).then((res) => {
    toast.success(res.data.message)
  }).catch((err) => {
    toast.error(err.data.error)
  }).finally(() => {
    form.name = ""
    form.price = ""
    form.colors = ""
    form.description = ""
    form.condition = ""
    form.category_id = ""
    form.imageFiles = ""
    form.specifications = {}
  })

}

</script>