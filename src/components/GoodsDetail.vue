<template>
    <div class="main">
        <as-header headtitle="商品详情"></as-header>

        <template v-if="!!goods_info.id">
        <div class="product-flash" style="width: 400px; height: 400px; padding-bottom: 0; overflow: hidden;">
            <div class="flash-slide">
                <img class="slide-image" :src="goods_info.image">
            </div>
        </div>


        <div class="product-info" >
            <div class="info-name">{{goods_info.name}}</div>
            <div class="info-price">
                <span class="price-shop danger">{{goods_info.integral}}积分</span>
                <!--<span class="price-market">￥1,665.60</span>-->
            </div>
            <div class="info-favorite">
                <img src="/static/image/favorite-off.png">
            </div>
        </div>

        <!--<div class="product-attr" >
            <div class="attr-group">
                <div class="group-name">商品属性</div>
                <div class="group-items">
                    <div class="group-item" style="border: none">请选择 ...</div>
                </div>
            </div>
        </div>-->

        <div class="product-amount" >
            <div class="amount-name">数量</div>
            <div class="amount-input active">
                <div class="input-button" @click="reduceBuyCount"><img src="/static/image/ind-sub.png"></div>
                <input type="text" v-model="buy_count" class="input-count active">
                <div class="input-button active" @click="addBuyCount"><img src="/static/image/ind-add.png"></div>
            </div>
        </div>

        <div class="product-intro" >
            <div class="intro-header">
                商品介绍
            </div>
            <div class="intro-content" v-html="goods_info.description">
                <!--<p>商品详情<br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>-->
            </div>
        </div>

        <div class="product-submit fixed-bottom" >
            <div class="submit-cart">
                <img class="cart-icon" src="/static/image/ind-cart.png">
                <!--<div class="cart-badge">1</div>-->
            </div>
            <div class="submit-button dark active circle-button-right" @click="buyNow">立即购买</div>
            <div class="submit-button active circle-button-left">加入购物车</div>
        </div>
        </template>
    </div>
</template>

<script>
import Tools from "../lib/Tools";

export default {
    name: 'HelloWorld',
    data() {
        return {
            goods_id: 0,
            buy_count: 1,
            goods_info: {},
        }
    },
    methods: {
        addBuyCount: function () {
            let that = this;
            that.buy_count = that.buy_count + 1;
        },
        reduceBuyCount: function () {
            let that = this;
            var buy_count = that.buy_count - 1;
            that.buy_count = buy_count > 0 ? buy_count : 1;
        },
        buyNow: function () {
            let that = this;
            that.$router.push({
                name: 'OrderAdd',
                params: {
                    goods_id: that.goods_id,
                    goods_info: that.goods_info,
                    buy_count: that.buy_count,
                }
            });
        }
    },
    created: function () {
        let that = this;

        that.goods_id = parseInt(that.$route.params.id);
        if(! that.goods_id){
            Tools.toast("请先选择商品！");
            that.$router.go(-1);
            return;
        }

        Tools.requestPost(
            '/goods/detail',
            {
                id : that.goods_id
            },
            function(data){
                if(data.err_code === 0){
                    that.goods_info = data.goods_info;
                    console.log(that.goods_info);
                } else {
                    that.goods_info = {};
                }
            }
        );
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
