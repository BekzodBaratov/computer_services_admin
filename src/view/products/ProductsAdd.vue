<template>

  <form method="POST">

    <div class="flex w-full gap-10">
      <ProductInput v-model="form.name"  placeholder="Nomi" />
      <ProductInput v-model="form.price" input-type="number"  placeholder="Narxi" />
    </div>

    <div class="flex w-full gap-10">
      <ProductInput v-model="form.colors"  placeholder="Rangi" />
      <ProductInput v-model="form.condition"   placeholder="Holati" />
    </div>


    <label class="block  my-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Rasm yuklash
      </label>
    <input
        class="block mb-6  w-full text-sm p-2.5 text-gray-900 border border-gray-300 rounded-[6px] cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="user_avatar_help" id="user_avatar" type="file" ref="file" @change="getFile($event)">

    <Textarea v-model="form.description" placeholder="Qisqacha sharhi" />

    <button type="submit" @click="handleSubmit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Saqlash</button>
  </form>

</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";

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
  console.log(form,"fomrm ele")
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
    toast.error(err.message)
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