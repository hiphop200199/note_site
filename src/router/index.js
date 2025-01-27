import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CreateView from '@/views/CreateView.vue'
import ListView from '@/views/ListView.vue'
import NoteView from '@/views/NoteView.vue'
import { useAuthStore } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
    },
    {
      path: '/note/:id',
      name: 'note',
      component: NoteView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
    },
  ],
})

//預防沒權限的情況下瀏覽某些路由
router.beforeEach(async (to) => {
  const authstore = useAuthStore()
  if (
    // make sure the user is authenticated
    authstore.isLogin === null &&
    // ❗️ Avoid an infinite redirect
    (to.name === 'create' || to.name === 'list' || to.name === 'note')
  ) {
    // redirect the user to the login page
    return { name: 'home' }
  }
})

export default router
