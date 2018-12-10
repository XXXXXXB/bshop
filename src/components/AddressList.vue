<template>
    <div class="main">
        <as-header headtitle="地址列表"></as-header>
        <!--<div class="navbar fixed-top1">
            <div class="navbar-left hide-weixin">
                <img class="button-icon" src="/static/image/nav-left.png">
                <div class="button-text">返回</div>
            </div>
            <div class="navbar-title">
                地址管理
            </div>
            <div class="navbar-right">
            </div>
        </div>-->

        <div class="app-content">
            <div class="address-list">
                <div class="list-item readonly" v-for="address_info in address_list">
                    <div class="item-info">
                        <div class="info-contact">{{address_info.name}} {{address_info.mobile}}<span class="contact-default" v-if="address_info.default">默认</span></div>
                        <div class="info-detail">
                            <span>{{address_info.province}}</span>
                            <span>{{address_info.city}}</span>
                            <span>{{address_info.district}}</span>
                            {{address_info.address}}
                        </div>
                    </div>
                    <router-link :to="'/address-edit/' + address_info.id">
                        <div class="item-edit"><img src="/static/image/ind-edit.png"></div>
                    </router-link>
                </div>
            </div>
            <div class="loading-more">
                全部加载完毕
            </div>

            <div class="address-bar fixed-bottom">
                <router-link to="/address-add">
                    <div class="bar-create circle-button theme-bg-color">添加收货地址</div>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
import Tools from "../lib/Tools";

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            address_list: []
        }
    },
    created: function () {
        let that = this;
        that.goods_id = that.$route.params.id;
    },
    methods: {
        addressAdd: function () {
            let that = this;
            that.$router.push({ name: 'AddressAdd', params: { goods_id: that.goods_id }})
        }
    },
    mounted: function () {

    },    
    created : function () {
        let that = this;
        Tools.requestPost(
            '/address/index',
            {

            },
            function(data){
                if(data.err_code === 0){
                    that.address_list = data.address_list;
                    console.log(that.address_list);
                    if(data.address_list.length > 0){
                        //that.bottom_all_loaded = false;
                    } else {
                        //that.bottom_all_loaded = true;
                    }
                    try {
                        //that.$refs.loadmore.onBottomLoaded();
                    } catch (err){
                        //console.log(err);
                    }
                } else {
                    //that.bottom_all_loaded = true;
                }
            }
        );
    },
}
</script>

<style>
</style>
