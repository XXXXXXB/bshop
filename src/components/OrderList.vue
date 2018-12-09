<template>
    <div class="main">
        <as-header headtitle="订单列表"></as-header>
        <!--<div class="navbar fixed-top1">
            <div class="navbar-left hide-weixin">
                <img class="button-icon" src="/static/image/nav-left.png">
                <div class="button-text">返回</div>
            </div>
            <div class="navbar-title">
                我的订单
            </div>
        </div>-->
        <div class="app-content">

            <div class="order-filter">
                <div class="filter-item active"><span class="text">全部</span></div>
                <div class="filter-item"><span class="text">待付款</span></div>
                <div class="filter-item"><span class="text">待发货</span></div>
                <div class="filter-item"><span class="text">待收货</span></div>
                <div class="filter-item"><span class="text">待评价</span></div>
            </div>

            <div class="order-list">
                <div class="list-item" v-for="order_info in order_list">
                    <div class="item-header">
                        <div class="header-sn">#{{order_info.order_sn}}</div>
                        <div class="header-status" v-if="order_info.order_status === 0">等待买家付款</div>
                        <div class="header-status" v-if="order_info.order_status === 1">等待商家发货</div>
                        <div class="header-status" v-if="order_info.order_status === 2">等待买家收货</div>
                        <div class="header-status" v-if="order_info.order_status === 3 || order_info.order_status === 4">已退货</div>
                        <div class="header-status" v-if="order_info.order_status === 5">交易完成</div>
                    </div>
                    <div class="order-goods" v-for="goods_info in order_info.goods_list">
                        <div class="goods-item">
                            <div class="item-photo">
                                <img :src="goods_info.goods_image !== '' ? goods_info.goods_image : '/static/image/default-photo.png'">
                            </div>
                            <div class="item-info">
                                <div class="info-name">{{goods_info.goods_name}}</div>
                                <div class="info-attr">灰色</div>
                                <div class="info-price">{{goods_info.goods_integral}}积分</div>
                                <div class="info-amount">x{{goods_info.buy_count}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-footer">
                        <div class="footer-sum">
                            <span class="sum">合计：{{order_info.integral}} 积分</span>
                            <!--<span class="sum">（运费：￥15.00）</span>-->
                        </div>
                        <div class="footer-button dark" v-if="order_info.order_status === 0">付款</div>
                        <div class="footer-button" v-if="order_info.order_status === 0">取消订单</div>
                        <div class="footer-button" v-if="order_info.order_status === 2">确认收货</div>
                        <div class="footer-button" v-if="order_info.order_status === 2">查看物流</div>
                    </div>
                </div>
            </div>
            <div class="loading-more">全部加载完毕</div>
        </div>
    </div>
</template>

<script>
    import Tools from "../lib/Tools";

    export default {
        name: 'HelloWorld',
        data() {
            return {
                order_list: {},
            }
        },
        methods: {
            orderAdd: function () {
                let that = this;
                console.log(that.$route.params);
                //that.$router.push({ name: 'OrderAdd', params: { goods_id: that.goods_id }})
            },
        },
        created: function () {
            let that = this;

            Tools.requestPost(
                '/order/index',
                {

                },
                function(data){
                    if(data.err_code === 0){
                        that.order_list = data.order_list;
                    } else {
                        //Tools.toast(data.err_msg);
                    }
                }
            );
        }
    }
</script>

<style>
</style>