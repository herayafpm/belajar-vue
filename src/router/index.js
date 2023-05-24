import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestConsultation from '../views/RequestConsultationView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/request_consultation',
      name: 'request_consultation',
      component: RequestConsultation
    }
  ]
})

export default router
