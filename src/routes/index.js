import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import Products from "../view/ProductsView.vue"


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/products",
    name: "product",
    component: Products,
  },
];

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});
export default router;
