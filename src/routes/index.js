import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import CreateService from "../view/service/CreateService.vue";
import Forms from "../view/Forms.vue";
import Tables from "../view/Tables.vue";
import products from "../view/products/Products.vue";
import ProductAdd from "../view/products/ProductsAdd.vue"

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
    path: "/add_service",
    name: "service",
    component: CreateService,
  },
  {
    path: "/product_add",
    name: "ProductAdd",
    component: ProductAdd,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/products",
    name: "Products",
    component: products,
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
