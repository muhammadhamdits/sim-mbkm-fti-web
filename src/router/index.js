import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from '../utils/function'
import Login from '../views/Login.vue'

import AdminProgram from '../views/Admin/Program.vue'
import AdminAgency from '../views/Admin/Agency.vue'
import AdminType from '../views/Admin/Type.vue'
import AdminCourse from '../views/Admin/Course.vue'

// import 

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/program',
    name: 'AdminProgram',
    component: AdminProgram,
    meta: { role: "Admin" }
  },
  {
    path: '/admin/agency',
    name: 'AdminAgency',
    component: AdminAgency,
    meta: { role: "Admin" }
  },
  {
    path: '/admin/type',
    name: 'AdminType',
    component: AdminType,
    meta: { role: "Admin" }
  },
  {
    path: '/admin/course',
    name: 'AdminCourse',
    component: AdminCourse,
    meta: { role: "Admin" }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  const { $cookies } = router.app.config.globalProperties
  const data = { jwt: $cookies.get('jwt') }
  
  const authData = await checkAuth(data)
  if(authData.role === "Admin" && to.name !== 'Login') next()
  else if(authData.role === "Admin" && to.name === 'Login') next({ name: 'AdminProgram' })
  else if(!authData.role && to.name !== 'Login') next({ name: 'Login' })
  else next()
})

export default router
