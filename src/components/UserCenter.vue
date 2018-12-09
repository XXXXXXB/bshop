<template>
    <div class="main">
        <div>
            <as-header headtitle="用户中心"></as-header>
            <div class="profile-head">
                <img class="head-avatar" src="/static/image/default-avatar.png">

                <div class="head-info">
                    <div class="info-name"></div>
                    <div class="info-grade">注册用户<br>积分:100</div>
                </div>
            </div>
            <div class="profile-item">
                <img class="item-icon" src="/static/image/icon-order.png">

                <div class="item-name">我的订单</div>
                <router-link to="/order-list">
                <div class="item-desc">查看全部订单</div>
                <img class="item-arrow" src="/static/image/nav-right.png">
                </router-link>
            </div>
            <div class="profile-menu">
                <div class="menu-item">
                    <img class="item-icon" src="/static/image/status-created.png">
                    <!--<div class="item-badge">1</div>-->
                    <div class="item-text">待付款</div>
                </div>
                <div class="menu-item">
                    <img class="item-icon" src="/static/image/status-paied.png">
                    <!--<div class="item-badge">2</div>-->
                    <div class="item-text">待发货</div>
                </div>
                <div class="menu-item">
                    <img class="item-icon" src="/static/image/status-delivering.png">
                    <!--<div class="item-badge">1</div>-->
                    <div class="item-text">待收货</div>
                </div>
                <div class="menu-item">
                    <img class="item-icon" src="/static/image/status-deliveried.png">
                    <div class="item-text">退货</div>
                </div>
            </div>

            <div class="profile-item">
                <img class="item-icon" src="/static/image/icon-favorite.png">
                <a class="item-name" href="#1">我的收藏</a>
                <div class="item-desc"></div>
                <img class="item-arrow" src="/static/image/nav-right.png">
            </div>
            <div class="profile-item">
                <img class="item-icon" src="/static/image/icon-address.png">
                <router-link to="/address-list">
                    <div class="item-name">收货地址</div>
                </router-link>
                <div class="item-desc"></div>
                <img class="item-arrow" src="/static/image/nav-right.png">
            </div>

            <div class="profile-submit circle-button theme-bg-color" @click="logout">退出登录</div>

            <as-tabbar></as-tabbar>
        </div>
    </div>
</template>

<script>
import Tab   from './common/Tab.vue';
import Tools from "../lib/Tools";

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {
        Tab
    },
    methods : {
        logout : function () {
            let that = this;
            Tools.removeLocalData('token');
            that.$router.push({ name: 'UserLogin', params: {}})
        }
    },
    created : function () {
        Tools.requestPost(
            '/user/info',
            {
                test: 1,
            },
            function (data) {
                if(data.err_code === 0){
                    Tools.setLocalData('user_info', data.user_info);
                } else {
                    Tools.toast(data.err_msg);
                }
            }
        );
    },
    beforeRouteEnter (to, from, next) {
        let token = Tools.getLocalData('token');
        console.log(token);
        if(! token || token === '' || token === 'undefined'){
            Tools.removeLocalData('token');
            next('/user-login');
        } else {
            next();
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*@import "../assets/css/index.css";*/
</style>
