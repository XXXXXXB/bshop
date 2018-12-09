import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import UserCenter from '@/components/UserCenter'
import UserLogin from '@/components/UserLogin'
import UserRegister from '@/components/UserRegister'
import GoodsDetail from '@/components/GoodsDetail'
import GoodsCat from '@/components/GoodsCat'
import GoodsList from '@/components/GoodsList'
import OrderAdd from '@/components/OrderAdd'
import OrderList from '@/components/OrderList'
import AddressAdd from '@/components/AddressAdd'
import AddressList from '@/components/AddressList'
import AddressSelect from '@/components/AddressSelect'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/user-login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/user-register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/goods-detail/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/goods-cat/',
      name: 'GoodsCat',
      component: GoodsCat
    },
    {
      path: '/goods-list/:cat_id',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/order-add',
      name: 'OrderAdd',
      component: OrderAdd
    },
    {
      path: '/order-list',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/address-add',
      name: 'AddressAdd',
      component: AddressAdd
    },
    {
      path: '/address-edit/:address_id',
      name: 'AddressEdit',
      component: AddressAdd
    },
    {
      path: '/address-list',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/address-select',
      name: 'AddressSelect',
      component: AddressSelect
    }
  ]
})
