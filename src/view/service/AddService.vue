<template>
  <div
    id="popup-modal"
    class="fixed top-0 hidden items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full h-[100vh]"
  >
    <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <p class="py-2 px-3 font-medium">Tahrirlash:</p>

        <div class="px-4 py-2 text-center w-full">
          <form class="border mb-4">
            <textarea
              type="text"
              class="w-full h-[80px] outline-none p-2 resize-none"
              v-model="editServiceText"
            ></textarea>
          </form>
          <div class="flex justify-end">
            <button
              id="cancel"
              @click="cancelModal"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Bekor qilish
            </button>
            <button
              id="agree"
              @click="editModal"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 btn dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal 2 -->
  <div
    id="popup-modal2"
    class="fixed top-0 hidden items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full h-[100vh]"
  >
    <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <p class="py-2 px-3 font-medium">Tahrirlash:</p>

        <div class="px-4 py-2 text-center w-full">
          <form class="border mb-4">
            <textarea
              type="text"
              class="w-full h-[80px] outline-none p-2 resize-none"
              v-model="editProblemText"
            ></textarea>
          </form>
          <div class="flex justify-end">
            <button
              id="cancel2"
              @click="cancelModal2"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Bekor qilish
            </button>
            <button
              id="agree2"
              @click="editModal2"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 btn dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="text-[20px] font-semibold">Servicelar qo'shish bo'limi</h2>

  <form method="POST">
    <div class="flex w-full gap-10">
      <ProductInput
        v-model="form.name"
        label="Nomi"
        placeholder="Valisher Botirov"
      />
      <ProductInput
        v-model="form.phone"
        input-type="number"
        placeholder="+998995491111"
        label="Tel raqam"
      />
    </div>

    <label
      class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
      for="user_avatar"
      >Rasm yuklash
    </label>
    <input
      class="block mb-6 w-full text-sm p-2.5 text-gray-900 border border-gray-300 rounded-[6px] cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:label-gray-400"
      aria-describedby="user_avatar_help"
      id="user_avatar"
      type="file"
      ref="file"
      @change="getFile($event)"
    />

    <!-- to do -->
    <p>Servise qo'shish:</p>
    <div class="w-full my-4">
      <form class="w-full" @submit="addService">
        <input
          type="text"
          v-model="service"
          class="w-full rounded-md h-[40px] px-4 outline-none"
          placeholder="Service qo'shish"
        />
      </form>
      <div
        class="my-2 w-full bg-white p-2 flex justify-between"
        v-for="(item, ind) in form.features"
        :key="ind"
      >
        <div>
          <span class="font-medium mr-2">{{ ind + 1 }}.</span>{{ item }}
        </div>
        <div
          class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full"
        >
          <i
            class="fa-solid fa-pen-to-square text-[blue] cursor-pointer"
            @click="editService(ind)"
          ></i>
          <i
            class="fa-solid fa-trash text-[red] cursor-pointer"
            @click="deleteService(ind)"
          ></i>
        </div>
      </div>
    </div>

    <!-- resolve problem -->

    <div class="mb-4 mt-2">
      <p>Muommolar qo'shish:</p>
      <div class="w-full my-3">
        <form class="w-full" @submit="addProblem">
          <input
            type="text"
            v-model="problem"
            class="w-full rounded-md h-[40px] px-4 outline-none"
            placeholder="Muommolar qo'shish"
          />
        </form>
        <div
          class="my-2 w-full bg-white p-2 flex justify-between"
          v-for="(item, ind) in form.resolve_problems"
          :key="ind"
        >
          <div>
            <span class="font-medium mr-2">{{ ind + 1 }}.</span>{{ item }}
          </div>
          <div
            class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full"
          >
            <i
              class="fa-solid fa-pen-to-square text-[blue] cursor-pointer"
              @click="editProblem(ind)"
            ></i>
            <i
              class="fa-solid fa-trash text-[red] cursor-pointer"
              @click="deleteProblem(ind)"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <Textarea v-model="form.description" placeholder="Qisqacha sharhi" />

    <button
      type="submit"
      @click="handleSubmit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Saqlash
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";

const toast = useToast();

const service = ref("");
const editServiceText = ref("");
const editProblemText = ref("");

const problem = ref("");

const form = reactive({
  name: "",
  description: "",

  phone: "",
  imageFiles: "",

  features: ["A'lo darajada xizmat ko'rsatamiz!"],
  resolve_problems: ["Test uchun"],
});

// add service

function addService(e) {
  e.preventDefault();
  if (service.value !== "") {
    form.features.push(service.value);
    service.value = "";
  }
}

function deleteService(id) {
  form.features = form.features.filter((el, item) => item !== id);
}

const idEdit = ref("");
function editService(id) {
  idEdit.value = id;
  const modal = document.getElementById("popup-modal");
  modal.classList.add("modal-class");
  let name = form.features[id];
  editServiceText.value = name;
}

function cancelModal() {
  const modal = document.getElementById("popup-modal");
  modal.classList.remove("modal-class");
}

function editModal() {
  const modal = document.getElementById("popup-modal");
  modal.classList.remove("modal-class");
  form.features[idEdit.value] = editServiceText.value;
}

// resolve propblem

function cancelModal2() {
  const modal = document.getElementById("popup-modal2");
  modal.classList.remove("modal-class");
}

function editModal2() {
  const modal = document.getElementById("popup-modal2");
  modal.classList.remove("modal-class");
  form.resolve_problems[idEdit.value] = editProblemText.value;
}

function addProblem(e) {
  e.preventDefault();
  if (problem.value !== "") {
    form.resolve_problems.push(problem.value);
    problem.value = "";
  }
}

function deleteProblem(id) {
  form.resolve_problems = form.resolve_problems.filter(
    (el, item) => item !== id
  );
}

function editProblem(id) {
  idEdit.value = id;
  const modal = document.getElementById("popup-modal2");
  modal.classList.add("modal-class");
  let name = form.resolve_problems[id];
  editProblemText.value = name;
}

// submit form

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.imageFiles) {
    let phoneNumber = "+" + String(form.phone);
    let formData = new FormData();
    formData.append("image", form.imageFiles);
    formData.append("name", form.name);
    formData.append("phone", phoneNumber);
    formData.append("description", form.description);
    formData.append("resolve_problems", JSON.stringify(form.resolve_problems));
    formData.append("features", JSON.stringify(form.features));
    fetchData(formData);
  }
};

const getFile = (event) => {
  form.imageFiles = event.target.files[0];
  console.log(form, "fomrm ele");
};

const fetchData = (data) => {
  axios({
    method: "POST",
    url: "services",
    withCredentials: true,
    data: data,
  })
    .then((res) => {
      toast.success(res.data.message);
      form.name = "";
      form.phone = "";
      form.description = "";
      form.imageFiles = "";
      form.specifications = {};
      // setTimeout(() =>{
      //   window.location.reload()
      // },2000)
    })
    .catch((err) => {
      toast.error(err.message);
    });
};
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
