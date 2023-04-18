import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import Services from "../view/service/Services.vue";
import ServiceAdd from "../view/service/AddService.vue";
import ServiceEdit from "../view/service/EditService.vue";
import products from "../view/products/Products.vue";
import ProductAdd from "../view/products/ProductsAdd.vue";
import ProductEdit from "../view/products/ProductsEdit.vue";
import Category from "../view/CategoryView.vue";
import Configuration from "../view/ConfigurationView.vue";

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
    path: "/services",
    name: "service",
    component: Services,
  },
  {
    path: "/service_add",
    name: "ServiceAdd",
    component: ServiceAdd,
  },
  {
    path: "/service/:id",
    name: "ServiceEdit",
    component: ServiceEdit,
  },
  {
    path: "/products",
    name: "Products",
    component: products,
  },
  {
    path: "/products/:id",
    name: "ProductsEdit",
    component: ProductEdit,
  },
  {
    path: "/product_add",
    name: "ProductAdd",
    component: ProductAdd,
  },
  {
    path: "/categories",
    name: "Category",
    component: Category,
  },
  {
    path: "/configuration",
    name: "Configuration",
    component: Configuration,
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
