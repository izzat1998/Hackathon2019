import Vue from 'vue'
import VueRouter from 'vue-router'
import Guard from '../services/Guard'

const DASHBOARD = () =>
    import('../components/MainComponent.vue')
const LOGIN = () =>
    import('../components/MainLogin.vue')
const ACCEPTED = () =>
    import('../components/sub_views/AcceptedTable.vue')
const REJECTED = () =>
    import('../components/sub_views/RejectedTable.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: LOGIN
},
{
  path: '/home',
  name: 'home',
  component: DASHBOARD
},
{
  path: '/accepted/complains',
  name: 'acceptedTables',
  component: ACCEPTED
},
{
  path: '/rejected/complains',
  name: 'acceptedTable',
  component: REJECTED
}
]

const router = new VueRouter({
  routes
})

export default router
