<template>
    <div class="main">

        <as-header headtitle="确认订单"></as-header>
        <!--<div class="navbar fixed-top1">
            <div class="navbar-left hide-weixin">
                <img class="button-icon" src="/static/image/nav-left.png"/>

                <div class="button-text">返回</div>
            </div>
            <div class="navbar-title">
                确认订单
            </div>
            <div class="navbar-right">
            </div>
        </div>-->

        <!-- Address -->
        <div class="confirm-address" @click="addressSelect">
            <template v-if="address_info.id > 0">
                <div class="address-contact">{{address_info.name}}&nbsp;{{address_info.mobile}}</div>
                <div class="address-detail">
                    <!--<span><span>中国</span>河北省</span>金成大厦-->
                    <span>{{address_info.address}}</span>
                </div>
            </template>
            <template v-else>
                <div class="address-create danger">请填写地址</div>
                <img class="address-arrow" src="/static/image/nav-right.png"/>
            </template>
        </div>

        <!-- Goods -->
        <div class="confirm-goods">
            <div class="goods-item" v-if="goods_info">
                <div class="item-photo">
                    <img :src="goods_info.image !== '' ? goods_info.image : '/static/image/default-photo.png'">
                </div>

                <div class="item-info">
                    <div class="info-name">{{goods_info.name}}</div>
                    <div class="info-attr">灰色</div>

                    <div class="info-price" style="color:#ff410d;">{{goods_info.integral}} <span>积分</span></div>
                    <div class="info-amount">x{{buy_count}}</div>
                </div>
            </div>
        </div>

        <!-- Form -->
        <div class="confirm-form">
            <div class="form-item">
                <div class="item-title">运费</div>
                <div class="item-value">包邮</div>
                <!--<img class="item-arrow" src="/static/image/nav-right.png"/>-->
            </div>
            <div class="form-item">
                <div class="item-title">留言</div>
                <div class="item-input">
                    <input type="text" placeholder="点击填写留言"/>
                </div>
            </div>

            <!--<div class="form-item">
                <div class="item-title">发票类型</div>
                <div class="item-value">不开发票</div>
                <img class="item-arrow" src="/static/image/nav-right.png"/>
            </div>
            <div class="form-item">
                <div class="item-title">使用红包</div>
                <div class="item-value">不使用红包</div>
                <img class="item-arrow" src="/static/image/nav-right.png"/>
            </div>
            <div class="form-item">
                <div class="item-title">使用积分</div>
                <div class="item-input">
                    <input type="text" placeholder="填写积分"/>
                    <div class="input-tips">您当前可用 0 积分，本订单最多可以使用1300积分，每积分抵扣 0.01 元</div>
                    <div class="input-tips">无可用积分</div>
                </div>
            </div>
            <div class="form-item">
                <div class="item-textarea">
                    <textarea type="text" placeholder="买家留言"></textarea>
                </div>
            </div>-->
        </div>

        <!-- Total -->
        <!--<div class="confirm-summury">
            <div class="summury-total">订单总额 <span class="total-price">+ ￥1388</span></div>
            <div class="summury-detail">商品总额 <span class="total-price">+ ￥1388</span></div>
            <div class="summury-detail">运费金额 <span class="total-price">+ ￥0.00</span></div>
            <div class="summury-detail">红包 <span class="total-price">- ￥0.00</span></div>
            <div class="summury-detail">积分 <span class="total-price">- ￥0.00</span></div>
        </div>-->

        <!-- Submit -->
        <div class="confirm-submit">
            <div class="submit-total">
                <!--<div class="total-price">￥1388</div>
                <div class="total-discount">已优惠¥0.00</div>-->
                实付：<span style="font-size: large;font-weight: bold;" class="theme-color">{{goods_info.integral}}</span> <span  class="theme-color">积分</span>
            </div>
            <div class="submit-button dark active circle-button theme-bg-color" @click="addOrder">提交订单并支付</div>
        </div>
    </div>
</template>

<script>
    import Tools from "../lib/Tools";

    export default {
        name: 'HelloWorld',
        data() {
            return {
                goods_id    : 0,
                goods_info  : {
                    //
                },
                buy_count   : 0,
                address_info: {
                    //
                }
            }
        },
        methods: {
            addOrder: function () {
                let that = this;

                //将商品id和属性id列表发送到后台生成订单
                Tools.requestPost(
                    '/order/add',
                    {
                        goods_id : that.goods_id,
                        address_id : that.address_info.id,
                        buy_count: that.buy_count,
                    },
                    function(data){
                        if(data.err_code === 0){
                            //调用支付接口
                            //如果是积分支付则直接扣除积分
                            Tools.toast(data.err_msg);
                            that.$router.replace({ name: 'OrderList', params: {}});
                        } else {
                            Tools.toast(data.err_msg);
                        }
                    }
                );
            },
            addressSelect: function () {
                let that = this;
                that.$router.push({ name: 'AddressSelect', params: {}})
            }
        },
        created: function () {
            let that = this;

            //接收商品id列表
            //接收商品属性列表
            //后台通过商品id和属性id查询订单价格

            that.goods_id = parseInt(that.$route.params.goods_id);
            that.goods_info = that.$route.params.goods_info;
            that.buy_count = that.$route.params.buy_count || 0;

            if(! that.goods_id){
                //Tools.toast("请先选择商品！");
                that.$router.go(-1);
                return;
            }

            Tools.requestPost(
                '/address/get_default',
                {

                },
                function(data){
                    if(data.err_code === 0){
                        that.address_info = data.address_info;
                        //console.log(that.address_info);
                    } else {
                        that.address_info = {};
                    }
                }
            );
        }
    }
</script>

<style>
</style>