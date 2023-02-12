import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import Users from "../view/Users.vue";
import Forms from "../view/Forms.vue";
import Tables from "../view/Tables.vue";
import UIElements from "../view/UI-elements.vue";
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
    path: "/ui-elements",
    name: "UI Elements",
    component: UIElements,
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
