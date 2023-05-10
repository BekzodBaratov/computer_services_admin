<template>
  <Teleport to="body">
    <div
      v-if="store.isRegisteration"
      class="fixed z-[999999] inset-0 bg-[#0006] backdrop-blur-md"
    ></div>
    <div
      v-if="store.isRegisteration"
      class="fixed z-[999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div class="loginModalbg p-16 text-[#F4F6F9] text-lg">
        <div class="flex flex-col gap-6">
          <img
            class="w-28 self-center mb-8"
            src="../../assets/logo.png"
            alt=""
          />
          <form v-if="changePassHandle == 'login'" class="flex flex-col gap-6">
            <div class="flex flex-col">
              <div class="mb-4 flex flex-col">
                <input
                  class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]"
                  type="email"
                  v-model="state.email"
                  name="email"
                  id="email"
                  placeholder="john@gmail.com"
                />
                <span
                  class="text-sm text-end text-red-600"
                  v-if="v$.email.$error"
                  >{{ v$.email.$errors[0].$message }}</span
                >
              </div>
              <div class="flex flex-col">
                <input
                  class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]"
                  type="password"
                  v-model="state.password"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                />
                <span
                  class="text-sm text-end text-red-600"
                  v-if="v$.password.$error"
                  >{{ v$.password.$errors[0].$message }}</span
                >
              </div>
            </div>
            <div class="flex justify-center items-end gap-2">
              <button type="submit" @click.prevent="formLoginData">
                <ButtonFill>
                  <span class="py-2 px-4">Вход</span>
                </ButtonFill>
              </button>
              <p
                @click="changePassHandle = 'changePass'"
                class="cursor-pointer hover:underline"
              >
                Change Password
              </p>
            </div>
          </form>
          <form
            v-if="changePassHandle == 'changePass'"
            class="flex flex-col gap-6"
          >
            <div class="flex flex-col gap-6">
              <div class="flex flex-col">
                <input
                  class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]"
                  type="password"
                  v-model="stateChangePass.oldPassword"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Старый пароль"
                />
                <span
                  class="text-sm text-end text-red-600"
                  v-if="stateChangePass.errors.oldPassword"
                  >{{ stateChangePass.errors.oldPassword }}</span
                >
              </div>
              <div class="flex flex-col">
                <input
                  class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]"
                  type="password"
                  v-model="stateChangePass.newPassword"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Новый пароль"
                />
                <span
                  class="text-sm text-end text-red-600"
                  v-if="stateChangePass.errors.newPassword"
                  >{{ stateChangePass.errors.newPassword }}</span
                >
              </div>
              <div class="flex flex-col">
                <input
                  class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]"
                  type="password"
                  v-model="stateChangePass.newPasswordConfirm"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Подтвердите пароль"
                />
                <span
                  class="text-sm text-end text-red-600"
                  v-if="stateChangePass.errors.newPasswordConfirm"
                  >{{ stateChangePass.errors.newPasswordConfirm }}</span
                >
              </div>
            </div>
            <div class="flex justify-between items-end gap-2">
              <button type="submit" @click.prevent="changePassword">
                <ButtonFill>
                  <span class="py-2 px-4">Вход</span>
                </ButtonFill>
              </button>
              <p
                @click="changePassHandle = 'login'"
                class="cursor-pointer hover:underline"
              >
                Go Back
              </p>
            </div>
          </form>
          <form
            v-if="changePassHandle == 'codePass'"
            class="flex flex-col gap-6"
          >
            <div class="flex flex-col">
              <div class="mb-4 flex flex-col">
                <input
                  class="bg-transparent border min-w-[16rem] border-white rounded-xl py-1 px-3 text-[#f4f4f9] outline-none text-center placeholder:text-[#F4F6F9B2]"
                  type="number"
                  v-model="passCode"
                  placeholder="000-000"
                />
                <span
                  class="text-sm text-end text-red-600"
                  v-if="!isCodeValid"
                  >{{ "Password must be 6 characters long" }}</span
                >
              </div>
            </div>
            <div class="flex justify-center items-end gap-2">
              <button type="submit" @click.prevent="codePassFunc">
                <ButtonFill>
                  <span class="py-2 px-4">Вход</span>
                </ButtonFill>
              </button>
              <p
                @click="changePassHandle = 'changePass'"
                class="cursor-pointer hover:underline"
              >
                Change Password
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
  <LoadingModalVue v-if="loading" />
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  required,
  email,
  minLength,
  helpers,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";

import LoadingModalVue from "./LoadingModal.vue";
import ButtonFill from "../buttons/ButtonFill.vue";
import { admin } from "../../store/admin";

const store = admin();

const loading = ref(false);
const changePassHandle = ref("login");
const passCode = ref();
const isCodeValid = ref(true);

const state = reactive({
  email: "",
  password: "",
});
const rules = computed(() => {
  return {
    email: { required, email, maxLength: maxLength(84) },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(32),
      containsUppercase: helpers.withMessage(
        "The password requires an uppercase character",
        function (value) {
          return /[A-Z]/.test(value);
        }
      ),
      containsLowercase: helpers.withMessage(
        "The password requires an lowercase character",
        function (value) {
          return /[a-z]/.test(value);
        }
      ),
      containsNumber: helpers.withMessage(
        "The password requires an number character",
        function (value) {
          return /[0-9]/.test(value);
        }
      ),
      containsSpecial: helpers.withMessage(
        "The password requires an special character",
        function (value) {
          return /[#?!_@$%^&*.-]/.test(value);
        }
      ),
    },
  };
});
const v$ = useVuelidate(rules, state);

const formLoginData = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    loading.value = true;
    fetchApi(state);
  }
};

const fetchApi = (data) => {
  console.log(state);
  const { email, password } = state;
  axios
    .post("/users/signin", { email, password })
    .then(function (response) {
      if (response.data.data.user.role === "admin") {
        store.admin = response.data.data.user;
        alert(response.data.message);
      } else {
        alert("error email or password");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error.message + ", Please try again");
    })
    .finally(function () {
      loading.value = false;
      state.email = "";
      state.password = "";
    });
};

const stateChangePass = reactive({
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
  errors: {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  },
});

const changePassword = async () => {
  const { oldPassword, newPassword, newPasswordConfirm } = stateChangePass;

  if (!oldPassword.length)
    return (stateChangePass.errors.oldPassword = "old password required");
  else if (!newPassword.length)
    return (stateChangePass.errors.newPassword = "new password required");
  else if (!newPasswordConfirm.length)
    return (stateChangePass.errors.newPasswordConfirm =
      "confirm password required");
  else if (newPasswordConfirm !== newPassword)
    return (stateChangePass.errors.newPasswordConfirm =
      "confirm password same as old password");

  console.log(stateChangePass);
  loading.value = true;
  try {
    const user = await axios.post("users/update", {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    });
    console.log(user);
    changePassHandle.value = "codePass";
    alert(user.data.message);
  } catch (error) {
    alert(error.response.data.message);
  } finally {
    loading.value = false;
    stateChangePass.errors = {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  }
};
async function codePassFunc() {
  if (String(passCode.value).length !== 6) return (isCodeValid.value = false);
  loading.value = true;
  try {
    const user = await axios.post("users/code", { code: passCode.value });
    console.log(user);
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  } finally {
    loading.value = false;
    passCode.value = undefined;
    isCodeValid.value = true;
  }
}
</script>

<style>
.loginModalbg {
  background: linear-gradient(
    180deg,
    rgba(79, 135, 211, 0.95) 0%,
    rgba(32, 95, 184, 0.95) 100%
  );
  border: 3px solid #f4f6f9;
  border-radius: 33px;
}
</style>
