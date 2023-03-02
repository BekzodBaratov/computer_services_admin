<template>

  <form method="POST">

    <div class="flex w-full gap-10">
      <ProductInput v-model="form.name"  label="Nomi" placeholder="Valisher Botirov" />
      <ProductInput v-model="form.phone" input-type="number" placeholder="+998995491111"  label="Tel raqam" />
    </div>




    <label class="block  my-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Rasm yuklash
      </label>
    <input
        class="block mb-6  w-full text-sm p-2.5 text-gray-900 border border-gray-300 rounded-[6px] cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:label-gray-400"
        aria-describedby="user_avatar_help" id="user_avatar" type="file" ref="file" @change="getFile($event)">


        <!-- to do -->
        <p>Task editor</p>
        <i class="fa-solid fa-trash text-[red]"></i>
        <i class="fa-solid fa-pen-to-square text-[blue]"></i>


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
  name: "",
  description: "",
  
  phone: "",
  imageFiles: "",

  features:  [
  "Valisher","Botirov"
  ],
  resolve_problems: [
  "Valisher","Botirov"
  ]


})

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.imageFiles) {
    let phoneNumber = '+' + String(form.phone)
    let formData = new FormData();
    formData.append('image', form.imageFiles);
    formData.append('name', form.name);
    formData.append('phone', phoneNumber);
    formData.append('description', form.description);
    formData.append('resolve_problems', form.resolve_problems);
    formData.append('features', form.features);
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
    url: "services",
    withCredentials: true,
    data: data,
  }).then((res) => {
    toast.success(res.data.message)
  }).catch((err) => {
    toast.error(err.message)
  }).finally(() => {
    form.name = ""
    form.phone = ""
    form.description = ""
    form.imageFiles = ""
    form.specifications = {}
  })

}

</script>