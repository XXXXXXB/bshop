
<template>
    <div class="main">

        <as-header></as-header>
        <div class="app-content">
            <div class="search-filter">
                <div class="filter-item active">
                    <span class="text">综合</span>
                </div>
                <div class="filter-item">
                    <span class="text">销量</span>
                </div>
                <div class="filter-item">
                    <span class="text">新品</span>
                </div>
                <div class="filter-item">
                    <span class="text">价格</span>
                    <div class="arrow">
                        <img class="ind" src="/static/image/ind-arrow-up.png">
                        <img class="ind" src="/static/image/ind-arrow-down.png">
                    </div>
                </div>
                <div class="filter-item">
                    <span class="text">信用</span>
                </div>
            </div>

            <template v-if="goods_list.length > 0">
                <!--<div class="home-product">-->
                    <!--<div class="product-item" v-for="goods in goods_list" @click="goodsDetail(goods)">-->
                        <!--<div class="item-photo"><img :src="goods.image"></div>-->
                        <!--<div class="item-name">{{ goods.name }}</div>-->
                        <!--<div class="item-price">{{ goods.integral }}积分</div>-->
                    <!--</div>-->
                <!--</div>-->

                <mt-loadmore :bottom-method="loadBottom" :bottomAllLoaded="bottom_all_loaded" ref="loadmore">
                    <div class="home-product">
                        <div class="product-item" v-for="goods in goods_list" @click="goodsDetail(goods)">
                            <div class="item-photo"><img :src="goods.image"></div>
                            <div class="item-name">{{ goods.name }}</div>
                            <div class="item-price">{{ goods.integral }}积分</div>
                        </div>
                    </div>
                    <div class="loading-more" v-if="bottom_all_loaded">
                        全部加载完毕
                    </div>
                </mt-loadmore>


                <!--<div class="search-product">
                    <div class="product-item" v-for="goods_info in goods_list">
                        <div class="item-photo">
                            <img :src="goods_info.image != '' ? goods_info.image : '/static/image/default-photo.png'">
                        </div>
                        <div class="item-name">{{goods_info.name}}</div>
                        <div class="item-footer">
                            <div class="footer-sales">0人付款</div>
                            <div class="footer-price">￥58.00</div>
                        </div>
                    </div>
                </div>-->

                <div class="loading-more" v-if="load_finished">
                    全部加载完毕
                </div>
            </template>
            <template v-else>
                <div class="empty">
                    <div class="empty-item">
                        <img class="item-logo" src="/static/image/logo-product-empty.png">
                        <div class="item-text">暂无任何商品</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Tools from "../lib/Tools";

export default {
    name: 'GoodsList',
    data() {
        return {
            goods_id: 0,
            mobile: '',
            password: '',
            list: [1],
            goods_cat_list: [],
            goods_list: [],
            load_finished: false,

            bottom_all_loaded : false,
            wrapperHeight: 0,
            page: 0,
        }
    },
    created: function () {
        let that = this;
        that.cat_id = parseInt(that.$route.params.cat_id);

        Tools.requestPost(
            '/goods/index',
            {
                cat_id: that.cat_id
            },
            function(data){
                if(data.err_code === 0){
                    that.goods_list = data.goods_list;
                    console.log(that.goods_list);
                    if(data.goods_list.length > 0){
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
            //
        },
        loadBottom: function () {
            let that = this;
            //console.log('loadBottom');
            that.page = that.page + 1;
            setTimeout(function () {
                Tools.requestGet(
                    '/goods/index',
                    {
                        page : that.page,
                    },
                    function(data){
                        if(data.err_code === 0){
                            //that.goods_list = that.goods_list.concat(data.goods_list);
                            data.goods_list.map(function (item) {
                                that.goods_list.push(item);
                            });
                            //console.log(that.goods_list);
                            if(data.goods_list.length > 0){
                                that.bottom_all_loaded = false;
                            } else {
                                that.bottom_all_loaded = true;
                            }
                            try {
                                that.$refs.loadmore.onBottomLoaded();
                            } catch (err){
                                console.log(err);
                            }
                        } else {
                            that.bottom_all_loaded = true;
                        }
                    }
                );
            }, 1000)
        },
        goodsDetail: function (goods_info) {
            let that = this;
            //console.log(goods_info);

            that.$router.push({ name: 'GoodsDetail', params: { id: goods_info.id }})
        },
    }
}
</script>

<style>
</style>
