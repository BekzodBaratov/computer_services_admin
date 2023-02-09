import { defineStore } from "pinia";

export const admin = defineStore("admin", {
  state: () => {
    return {
      user: { name: "" },
    };
  },
});
