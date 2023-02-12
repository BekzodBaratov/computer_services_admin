<template>
  <p>This is do for edit page </p>
</template>

<script setup>
import axios from "axios";
import {onMounted} from "@vue/runtime-core";

const fetchProductsList = () =>{
  console.log("ishlab jet")
  axios({
    method : "GET",
    url : "/products",
    withCredentials: true,
  }).then((res) =>{
    console.log(res,"respon")
  })
}

onMounted(() => {
  fetchProductsList()
})
</script>