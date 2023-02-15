import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/paciente',
    name: 'paciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/PacienteView.vue')
  },
  {
    path: '/vacina',
    name: 'vacina',
    component: () => import(/* webpackChunkName: "about" */ '../views/VacinaView.vue')
  },
  {
    path: '/entrada',
    name: 'entrada',
    component: () => import(/* webpackChunkName: "about" */ '../views/EntradaView.vue')
  },
  {
    path: '/saida',
    name: 'saida',
    component: () => import(/* webpackChunkName: "about" */ '../views/SaidaView.vue')
  },,
  {
    path: '/atendimento',
    name: 'atendimento',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtendimentoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
