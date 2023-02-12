import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import Users from "../view/Users.vue";
import Forms from "../view/Forms.vue";
import Tables from "../view/Tables.vue";
import productEdit from "../view/ProductsEdit.vue";
import ProductsView from "../view/ProductsView.vue"

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
    path: "/users",
    name: "users",
    component: Users,
  },
  {
    path: "/forms",
    name: "Forms",
    component: ProductsView,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/product-edit",
    name: "UI Elements",
    component: productEdit,
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
