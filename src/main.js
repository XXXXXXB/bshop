// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {
    Header,
    Button,
    Search,
    Swipe,
    SwipeItem,
    Loadmore,
    Tabbar,
    TabItem,
    Popup,
    Picker,
    InfiniteScroll
} from 'mint-ui';
import AsHeader from './components/common/Header.vue';
import AsTabBar from './components/common/TabBar.vue';
import './assets/css/iconfont.css'

Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Search.name, Search);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);

Vue.use(InfiniteScroll);

Vue.component('as-header', AsHeader);
Vue.component('as-tabbar', AsTabBar);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
