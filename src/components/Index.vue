<template>
    <div>
        <mt-header title="广茂积分商城" fixed></mt-header>

        <mt-search v-model="kwd" style="height:52px;margin-top: 40px;"></mt-search>

        <div class="page-loadmore-wrapper" ref="wrapper" :style="{height: wrapperHeight + 'px' }">
            <mt-swipe :auto="4000" style="height: 200px;">
                <mt-swipe-item class="slide1"><img src="https://giftshop.oss-cn-hangzhou.aliyuncs.com/goods/image/detail/20181201/15/25/1ea4282fa5b3fb9e55e24a5722e5f420.jpg" /></mt-swipe-item>
                <mt-swipe-item class="slide1"><img src="https://giftshop.oss-cn-hangzhou.aliyuncs.com/goods/image/detail/20181201/15/26/3360835e7c2242119217b78659601c64.jpg" /></mt-swipe-item>
                <mt-swipe-item class="slide1"><img src="https://giftshop.oss-cn-hangzhou.aliyuncs.com/goods/image/detail/20181201/15/26/d9cc030d280af30581469bdb94285149.png" /></mt-swipe-item>
            </mt-swipe>
            <mt-loadmore :bottom-method="loadBottom" :bottomAllLoaded="bottom_all_loaded" ref="loadmore">
                <div class="home-product">
                    <div class="product-item" v-for="goods in goods_list" @click="goodsDetail(goods)">
                        <div class="item-photo"><img :src="goods.image"></div>
                        <div class="item-name">{{ goods.name }}</div>
                        <div class="item-price">{{ goods.integral }}积分</div>
                    </div>
                </div>
                <div class="loading-more" style="margin-bottom: 50px;" v-if="bottom_all_loaded">
                    全部加载完毕
                </div>
            </mt-loadmore>
        </div>

        <as-tabbar></as-tabbar>
    </div>
</template>

<script>
    //import $ from 'jquery'
    //import Tab from './common/Tab.vue';
    import Tools from '../lib/Tools';

    export default {
        name: 'Index',
        data() {
            return {
                kwd: '',
                goods_list : [
                    /*{
                        id: 1,
                        name: '女童打底裤2018新款冬装加绒加厚洋气外穿保暖棉裤儿童宝宝长裤子',
                        price: '33.80',
                        image:'https://img.alicdn.com/tfscom/i4/1050387410/TB2pTRivz7nBKNjSZLeXXbxCFXa_!!1050387410-0-item_pic.jpg_300x300q90.jpg',
                    }*/
                ],
                flag: true,
                bottom_all_loaded : false,
                wrapperHeight: 0,
                page: 0,
            }
        },
        components: {
            //Tab
        },
        computed: {
            url_num      : function () {
                return this.msg.length;
            },
        },
        methods: {
            goodsDetail: function (goods_info) {
                let that = this;
                //console.log(goods_info);

                that.$router.push({ name: 'GoodsDetail', params: { id: goods_info.id }})
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
        },
        created: function() {
            let that = this;
            Tools.requestGet('/goods/index',{},function(data){
                if(data.err_code === 0){
                    /*data.goods_list.map(function (item) {
                        that.goods_list.push(item);
                    })*/
                    that.goods_list = that.goods_list.concat(data.goods_list);
                    //console.log(that.goods_list);
                }
            });
        },
        mounted: function () {
            let that = this;
            //console.log('mounted');
            //window.addEventListener('scroll', that.handleScroll, true);  // 监听（绑定）滚轮滚动事件
            //$(window).bind("scroll.index-goods-list", that.handleScroll);
            that.wrapperHeight = document.documentElement.clientHeight - that.$refs.wrapper.getBoundingClientRect().top;
        },
        destroyed: function () {
            let that = this;
            //console.log('destroyed');
            //window.removeEventListener('scroll', that.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
            //$(window).unbind("scroll.index-goods-list");
        },
    }
</script>

<style scoped>
    .mint-swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
    }
    .mint-swipe-item {
        line-height: 200px;
    }
    .slide1 {
        background-color: #ffffff;
        color: #fff;
    }
    .slide1 img{
        width:100%;
    }

    .page-loadmore-wrapper {
        overflow: scroll;
    }

    .mint-swipe-indicator {
        background: #ff410d;
        opacity: 1;
    }
</style>
