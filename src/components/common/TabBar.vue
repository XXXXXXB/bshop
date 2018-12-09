<template>
    <mt-tabbar v-model="selected">
        <!--<mt-tab-item id="1">
            <img slot="icon" src="/static/images/tab-home.png"/>
            <span class="theme-color">首页</span>
        </mt-tab-item>
        <mt-tab-item id="3">
            <img slot="icon" src="/static/images/tab-shopping-car.png"/>
            <span>购物车</span>
        </mt-tab-item>
        <mt-tab-item id="2">
            <img slot="icon" src="/static/images/tab-my.png"/>
            <span>我的</span>
        </mt-tab-item>-->
        <mt-tab-item :id="tab.id" v-for="tab in tabs" :key="tab.id">
            <template v-if="tab.id == $route.name">
                <img slot="icon" :src="tab.icon_active"/>
                <span class="theme-color">{{tab.name}}</span>
            </template>
            <template v-else>
                <img slot="icon" :src="tab.icon"/>
                <span>{{tab.name}}</span>
            </template>
        </mt-tab-item>
        {{switchTab()}}
    </mt-tabbar>
</template>

<script>
    export default {
        name   : 'HelloWorld',
        data() {
            return {
                selected    : 0,
                tabs : [
                    {
                        id : 'Index',
                        name : '首页',
                        icon : '/static/images/tab-home.png',
                        icon_active : '/static/images/tab-home-active.png',
                    },
                    {
                        id : 'GoodsCat',
                        name : '分类',
                        icon : '/static/images/tab-shopping-car.png',
                        icon_active : '/static/images/tab-shopping-car-active.png',
                    },
                    {
                        id : 'UserCenter',
                        name : '我的',
                        icon : '/static/images/tab-my.png',
                        icon_active : '/static/images/tab-my-active.png',
                    },
                ]
            }
        },
        computed : {

        },
        methods: {
            switchTab: function () {
                let that = this;
                if (!!that.selected && that.selected !== that.$route.name) {
                    that.$router.push({
                        name: that.selected,
                        params: {}
                    });
                }
            },
        }
    }
</script>

<style>
</style>
