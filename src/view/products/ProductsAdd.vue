<template>
  <h2 class="text-[20px] font-semibold">Productlarni qo'shish bo'limi</h2>
  <form method="POST">
    <div class="flex w-full gap-10">
      <ProductInput v-model="form.name" placeholder="Nomi" label="Nomi" />
      <ProductInput
        v-model="form.price"
        input-type="number"
        placeholder="Narxi"
        label="Narxi"
      />
    </div>

    <div class="flex w-full gap-10">
      <ProductInput v-model="form.colors" placeholder="Rangi" label="Rangi" />
      <ProductInput
        v-model="form.condition"
        placeholder="Holati"
        label="Holati"
      />
    </div>

    <!-- <pre>{{ category }}e</pre> -->
    <div class="flex w-full gap-10 items-center" v-if="category.length">
      <Select class="w-full" :data="category" @getVal="selectVal($event)" />
      <SButton variant="info" @click="openModal = true"
        >Yangi Kategoriya qo'shish</SButton
      >

      <AddModal
        :isOpen="openModal"
        :loading="modalLoading"
        @closeModal="openModal = $event"
        @fetchModal="getModalItem"
      />
    </div>

    <UploadImages @upload="getImages" />

    <Textarea
      v-model="form.description"
      placeholder="Qisqacha sharhi"
      class="mt-3"
    />

    <SButton variant="primary_dark" type="submit" @click="handleSubmit">
      Saqlash
    </SButton>
  </form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import Select from "../../components/input/select.vue";
import { onMounted } from "vue";
import SButton from "../../components/buttons/SButton.vue";
import AddModal from "../../components/modal/AddModal.vue";

const toast = useToast();

const openModal = ref(false);
const modalLoading = ref(false);

function getModalItem(emit) {
  modalLoading.value = true;
  axios
    .post("/categories", { name: emit })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      toast.error("Kategoriya qo'shishda xatolik yuz berdi!");
    })
    .finally(() => {
      modalLoading.value = false;
    });
}

const form = reactive({
  category_id: null,
  configuration_id: 1,
  name: "",
  description: "",
  condition: "",
  price: "",
  imageFiles: "",
  colors: "",
  specifications: [
    {
      name: "Valisher",
    },
    {
      name: "Bekzod",
    },
  ],
});

function selectVal(e) {
  form.category_id = e;
}

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.imageFiles) {
    let formData = new FormData();
    formData.append("imageFiles", form.imageFiles);
    formData.append("category_id", form.category_id);
    formData.append("configuration_id", form.configuration_id);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("condition", form.condition);
    formData.append("colors", form.colors);
    formData.append("specifications", form.specifications);
    fetchData(formData);
  }
};

function getImages(e) {
  form.imageFiles = e.file;
}

const fetchData = (data) => {
  axios({
    method: "POST",
    url: "products",
    withCredentials: true,
    data: data,
  })
    .then((res) => {
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((err) => {
      toast.error(err.message);
    })
    .finally(() => {
      form.name = "";
      form.price = "";
      form.colors = "";
      form.description = "";
      form.condition = "";
      form.category_id = "";
      form.imageFiles = "";
      form.specifications = {};
    });
};

const category = ref([]);

function getCategoryList() {
  axios.get("/categories").then((res) => {
    category.value = res.data.data.categories;
  });
}

onMounted(() => {
  getCategoryList();
});
</script>
