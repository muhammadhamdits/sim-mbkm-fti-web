import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from '../utils/function'
import Login from '../views/Login.vue'

import AdminProgram from '../views/Admin/Program.vue'
import AdminAgency from '../views/Admin/Agency.vue'
import AdminType from '../views/Admin/Type.vue'
import AdminCourse from '../views/Admin/Course.vue'
import StudentHome from '../views/Student/Home.vue'
import StudentProgram from '../views/Student/Program.vue'
import StudentLogbook from '../views/Student/Logbook.vue'
import HeadOfDeptDashboard from '../views/HeadOfDept/Dashboard.vue'
import HeadOfDeptSubmissions from '../views/HeadOfDept/Submissions.vue'
import SupervisorHome from '../views/Supervisor/Home.vue'
import SupervisorLogbook from '../views/Supervisor/Logbook.vue'
import ErrorPage from '../components/ErrorPage.vue'

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
  },
  {
    path: '/student/',
    name: 'StudentHome',
    component: StudentHome,
    meta: { role: "Student" }
  },
  {
    path: '/student/program',
    name: 'StudentProgram',
    component: StudentProgram,
    meta: { role: "Student" }
  },
  {
    path: '/student/logbook',
    name: 'StudentLogbook',
    component: StudentLogbook,
    meta: { role: "Student" }
  },
  {
    path: '/headofdept',
    name: 'HeadOfDeptDashboard',
    component: HeadOfDeptDashboard,
    meta: { role: true }
  },
  {
    path: '/headofdept/submissions',
    name: 'HeadOfDeptSubmissions',
    component: HeadOfDeptSubmissions,
    meta: { role: true }
  },
  {
    path: '/supervisor',
    name: 'SupervisorHome',
    component: SupervisorHome,
    meta: { role: false }
  },
  {
    path: '/supervisor/logbook',
    name: 'SupervisorLogbook',
    component: SupervisorLogbook,
    meta: { role: false }
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage
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
  if(authData.role === to.meta.role && to.name !== 'Login') next()
  else if(authData.role === to.meta.role && to.name === 'Login') next({ name: 'AdminProgram' })
  else if(authData.role === to.meta.role && to.name !== 'Login') next()
  else if(authData.role === to.meta.role && to.name === 'Login') next({ name: 'StudentHome' })
  else if(authData.role === to.meta.role && to.name !== 'Login') next()
  else if(authData.role === to.meta.role && to.name === 'Login') next({ name: 'HeadOfDeptDashboard' })
  else if(authData.role === to.meta.role && to.name !== 'Login') next()
  else if(authData.role === to.meta.role && to.name === 'Login') next({ name: 'SupervisorHome' })
  else if(!authData && to.name !== 'Login') next({ name: 'Login' })
  else if(to.name === 'ErrorPage') next()
  else next({ name: 'ErrorPage' })
})

export default router
