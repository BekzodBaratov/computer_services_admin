<template>
  <div>
    <h2 class="text-[20px] font-semibold">Mahsulotlarni tahrirlash bo'limi</h2>
    <!-- <pre>{{ productList.product }}</pre> -->
    <form method="POST" v-if="isMount">
      <div class="flex w-full gap-10">
        <ProductInput
          v-model="productList.product.name"
          placeholder="Nomi"
          label="Nomi"
        />
        <ProductInput
          v-model="productList.product.product_detail.price"
          input-type="number"
          placeholder="Narxi"
          label="Narxi"
        />
      </div>

      <div class="flex w-full gap-10">
        <ProductInput
          v-model="productList.product.product_detail.colors"
          placeholder="Rangi"
          label="Rangi"
        />
        <ProductInput
          v-model="productList.product.product_detail.condition"
          placeholder="Holati"
          label="Holati"
        />
      </div>
      <div class="flex w-full gap-10 items-center">
        <Select
          v-if="category.length"
          class="w-full"
          :data="category"
          :model="productList?.product?.category.id"
          :modelLabel="productList?.product?.category.name"
          @getVal="selectVal($event)"
        />
      </div>

      <UploadImages
        :image="productList.product.image_url"
        @upload="getImages"
      />

      <Textarea
        class="mt-4"
        v-model="productList.product.product_detail.description"
        placeholder="Qisqacha sharhini"
      />

      <button
        type="submit"
        @click="handleSubmit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Saqlash
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import { onMounted } from "vue";
import UploadImages from "../../components/input/uploadImages.vue";
import Select from "../../components/input/select.vue";
const route = useRoute();
const router = useRouter();
const toast = useToast();

const productList = ref([]);

const form = reactive({
  imageFiles: "",
  category_id: null,
});

function selectVal(e) {
  form.category_id = e;
}

function getImages(e) {
  form.imageFiles = e.file;
}

const isMount = ref(false);
const fetchData = (data) => {
  const params = {
    withCredentials: true,
  };
  axios
    .get(`/products/${route.params.id}`)
    .then((res) => {
      productList.value = res.data.data;
      form.category_id = productList.value.product?.category.id;
      isMount.value = true;
    })
    .catch((err) => {
      toast.error("Yuklanishda xatolik yuz berdi!");
    });
};

function handleSubmit(e) {
  e.preventDefault();
  const fetchObj = {
    name: productList.value?.product?.name,
    price: productList.value?.product?.product_detail?.price,
    description: productList.value?.product?.product_detail?.description,
    colors: productList.value?.product?.product_detail?.colors,
    category_id: form.category_id,
  };

  axios
    .patch(`/products/${route.params.id}`, fetchObj)
    .then((res) => {
      toast.success("Mahsulot muvaffaqiyatli tahrirlandi");
      setTimeout(() => {
        router.push("/products");
      }, 3000);
      console.log(res);
    })
    .catch((err) => {
      toast.error("Tahrirlashda xatoli yuz berdi!");
    });

  if (form.imageFiles) {
    let formData = new FormData();
    formData.append("image", form.imageFiles);
    axios
      .post(`products/update/image/${route.params.id}`, formData)
      .then((res) => {
        console.log(res, "images res");
      })
      .catch((err) => {
        toast.error("Rasm yangilashda xatoli berdi!");
      });
  }
}

const category = ref([]);

function getCategoryList() {
  axios.get("/categories").then((res) => {
    category.value = res.data.data.categories;
  });
}

onMounted(() => {
  fetchData();
  getCategoryList();
});
</script>
