import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Template/TemplateHome.vue'
import TemplateNotFound from '@/views/Template/TemplateNotFound.vue'
const checkAuth = (to, from, next) => {
  const authToken = localStorage.getItem('token')
  if (authToken) next()
  else next('/auth/login')
}
/*
const AuthFalse = (to, from, next) => {
  const authToken = localStorage.getItem('token')
  if (!authToken) next('/community')
  else next('/auth/login')
}
*/

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    alias: ['/home']
  },
  /*
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
  */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: TemplateNotFound
  },
  {
    path: '/auth/',
    name: 'authentication',
    component: () => import('@/views/Template/TemplateAuthentication.vue'),
    children: [
      {
        path: 'login/',
        name: 'login',
        component: () => import('@/components/Authentication/Login/LoginComponent.vue')
      },
      {
        path: 'forget-password/',
        name: 'forgetPassword',
        component: () => import('@/views/Template/TemplateSetPassword.vue'),
        children: [
          {
            path: '',
            name: 'ForgetPassword',
            component: () => import('@/components/Authentication/ForgetPassword/ForgetPassword.vue')
          },
          {
            path: ':email/check-email',
            name: 'Check-Email',
            component: () => import('@/components/Authentication/ForgetPassword/CheckEmail.vue')
          },
          {
            path: ':token/set-New-password',
            name: 'setNewPassword',
            component: () => import('@/components/Authentication/ForgetPassword/SetNewPassword.vue')
          },
          {
            path: 'successful-reset-password',
            name: 'setPasswordSuccess',
            component: () => import('@/components/Authentication/ForgetPassword/SuccessPassword.vue')
          }
        ]
      },
      {
        path: 'register/',
        name: 'register',
        component: () => import('@/components/Authentication/Register/RegisterComponent.vue')
      },
      {
        path: 'register/:email/',
        name: 'sendEmail',
        component: () => import('@/views/Template/TemplateSetPassword.vue'),
        children: [
          {
            path: '',
            name: 'Check-Email-For-Register',
            component: () => import('@/components/Authentication/RegisterSetPassword/CheckEmail.vue')
          },
          {
            path: 'set-password',
            name: 'SetPassword',
            component: () => import('@/components/Authentication/RegisterSetPassword/SetPassword.vue')
          },
          {
            path: 'register-complete',
            name: 'RegisterComplete',
            component: () => import('@/components/Authentication/RegisterSetPassword/SuccessSetPassword.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/community/',
    name: 'community',
    component: () => import('@/views/Template/TemplateCommunity.vue'),
    children: [
      {
        path: '',
        name: 'content',
        component: () => import('@/views/Controller/ContentGuide.vue'),
        beforeEnter: checkAuth
      },
      {
        path: ':id/Individual-Content',
        name: 'IndividualContent',
        component: () => import('@/views/Controller/IndividualGuild.vue'),
        beforeEnter: checkAuth
      }
    ]
  },
  {
    path: '/profile/',
    name: 'profile',
    component: () => import('@/views/Template/TemplateProfile.vue'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/Controller/ProfileGuild.vue'),
        beforeEnter: checkAuth
      },
      {
        path: 'update',
        name: 'update',
        component: () => import('@/views/Controller/ProfileGuild.vue'),
        beforeEnter: checkAuth
      },
      {
        path: 'posts',
        name: 'post',
        component: () => import('@/views/Controller/ProfileGuild.vue'),
        beforeEnter: checkAuth
      },
      {
        path: 'following',
        name: 'following',
        component: () => import('@/views/Controller/ProfileGuild.vue'),
        beforeEnter: checkAuth
      },
      {
        path: 'new-password',
        name: 'new-password',
        component: () => import('@/views/Controller/ProfileGuild.vue'),
        beforeEnter: checkAuth
      }
    ]
  },
  {
    path: '/editor/',
    name: 'editor',
    component: () => import('@/views/Template/TemplateEditor.vue'),
    children: [
      {
        path: 'title/',
        name: 'title',
        component: () => import('@/components/Editor/AskingTitle.vue'),
        beforeEnter: checkAuth
      },
      {
        path: 'title/:id',
        name: 'editorId',
        component: () => import('@/views/Controller/EditorGuild.vue'),
        props: true,
        beforeEnter: checkAuth
      }
    ]
  },
  {
    path: '/editor/title/',
    name: 'title',
    component: () => import('@/components/Editor/AskingTitle.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/friend/',
    name: 'friend',
    component: () => import('@/views/Template/TemplateCommunity.vue'),
    children: [
      {
        path: ':name',
        name: 'friendName',
        component: () => import('@/components/OtherUser/OtherProfile.vue')
      }
    ]
  },
  {
    path: '/testing/',
    name: 'testing',
    component: () => import('@/views/Template/TestingRoute.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
