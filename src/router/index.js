import Vue from 'vue'
import Router from 'vue-router'
import Approval from '@/components/Approval'
import succeed from '@/components/succeed'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Approval',
      component: Approval
    },
    {
      path: '/succeed',
      name: 'succeed',
      component: succeed
    }
  ]
})
