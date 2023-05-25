import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RequestConsultation from "../views/RequestConsultationView.vue";
import ListSpots from "../views/ListSpotsView.vue";
import SpotDetail from "../views/SpotDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/request_consultation",
      name: "request_consultation",
      component: RequestConsultation,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/list_spots/:vaccination",
      name: "list_spots",
      component: ListSpots,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/spot_detail/:spot_id",
      name: "spot_detail",
      component: SpotDetail,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("login_tokens") == null) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if(to.name == 'login'){
      if (localStorage.getItem("login_tokens") !== null) {
        next({ name: "home" });
      }
    }
    next();
  }
});

export default router;
