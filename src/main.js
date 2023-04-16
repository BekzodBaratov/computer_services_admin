import { createApp } from "vue";
import { createPinia } from "pinia";
import "./plugins/axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./routes";
import "./style.css";

const pinia = createPinia();
createApp(App).use(router).use(pinia).use(Toast).mount("#app");
