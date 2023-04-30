import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";

export const admin = defineStore("admin", () => {
  const admin = ref({ name: "" });

  if (sessionStorage.getItem("user")) {
    admin.value = JSON.parse(sessionStorage.getItem("user"));
  }

  watch(
    admin,
    (userVal) => {
      sessionStorage.setItem("user", JSON.stringify(userVal));
    },
    { deep: true }
  );

  const isRegisteration = computed(() => {
    return admin.value.name == "";
  });

  return { isRegisteration, admin };
});
