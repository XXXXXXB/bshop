<template>
    <div class="main">

        <!--<as-header></as-header>-->
        <!--<div class="navbar fixed-top">
            <div class="search">
                <img class="search-icon" src="image/ind-search.png">
                <span class="search-text">请输入您要搜索的商品</span>
            </div>
        </div>-->

        <div class="app-content">
            <div class="category-side" v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
                <router-link :to="'/goods-list/' + item.id" v-for="item in goods_cat_list" :key="item.id">
                    <div class="side-item">{{item.name}}</div>
                </router-link>
                <!--<div class="side-item active"> 家用电器</div>
                <div class="side-item"> 数码时尚</div>
                <div class="side-item"> 智能硬件</div>
                <div class="side-item"> 移动电源</div>
                <div class="side-item"> 手机类型</div>
                <div class="side-item"> 手机</div>
                <div class="side-item"> 充值卡</div>
                <div class="side-item"> 服装</div>
                <div class="side-item"> 配件</div>-->
            </div>
            <!--<div class="category-main">
                <div class="main-item"> 全部</div>
                <div class="main-item"> 大家电</div>
            </div>-->
        </div>

        <as-tabbar></as-tabbar>
    </div>
</template>

<script>
import Tools from "../lib/Tools";

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            goods_id: 0,
            mobile: '',
            password: '',
            list: [1],
            goods_cat_list: [],
            loading: true,
        }
    },
    created: function () {
        let that = this;

        Tools.requestPost(
            '/goods_cat/index',
            {

            },
            function(data){
                if(data.err_code === 0){
                    that.goods_cat_list = data.goods_cat_list;
                    console.log(that.goods_cat_list);
                    if(data.goods_cat_list.length > 0){
                        //that.bottom_all_loaded = false;
                    } else {
                        //that.bottom_all_loaded = true;
                    }
                } else {
                    //that.bottom_all_loaded = true;
                }

                that.loading = false;
            }
        );
    },
    methods: {
        loadMore: function () {
            return;
            console.log('-------loadMore---------');
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                    this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
        }
    }
}
</script>

<style>
</style>
