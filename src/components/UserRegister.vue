<template>
    <div class="main">
        <as-header></as-header>

        <div class="signup-form" style="margin-top: 70px;">
            <div class="signup-field">
                <input type="text" v-model="mobile" class="field-input" placeholder="请输入手机号">
            </div>

            <div class="signup-hline"></div>

            <div class="signup-field-code">
                <input type="text" v-model="sms_code" class="field-input" placeholder="请输入手机验证码">
                <div class="mobile-code">获取验证码</div>
            </div>
        </div>

        <div class="signup-form">
            <div class="signup-field">
                <input type="password" v-model="password" class="field-input" placeholder="设置密码">
            </div>

            <div class="signup-hline"></div>

            <div class="signup-field">
                <input type="password" v-model="password2" class="field-input" placeholder="确认密码">
            </div>
        </div>

        <!--<div class="signup-tips">6-20位数字/字母/符号</div>-->

        <div class="signup-submit" @click="userRegister">注册</div>
        <div class="signup-license">点击注册表示同意<span class="license">《用户协议》</span></div>
    </div>
</template>

<script>
    import Tools from '../lib/Tools';
    import {
        Toast
    } from 'mint-ui';

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            goods_id: 0,

            mobile : '',
            sms_code: '',
            password: '',
            password2: ''
        }
    },
    created: function () {
        let that = this;
        that.goods_id = that.$route.params.id;
    },
    methods: {
        userRegister: function () {
            let that = this;
            Tools.requestPost(
                '/user/register',
                {
                    mobile : that.mobile,
                    sms_code : that.sms_code,
                    password : that.password,
                    password2 : that.password2,
                },
                function (data) {
                    if(data.err_code === 0){
                        Tools.setLocalData('token', data.token);
                        Tools.toast(data.err_msg);
                        that.$router.replace({ name: 'Index', params: {}});
                    } else {
                        Tools.toast(data.err_msg);
                    }
                }
            );
        },
        orderAdd: function () {
            let that = this;
            console.log(that.$route.params);
            //that.$router.push({ name: 'OrderAdd', params: { goods_id: that.goods_id }})
        },
        addressAdd: function () {
            let that = this;
            that.$router.push({ name: 'AddressList', params: { goods_id: that.goods_id }})
        }
    }
}
</script>

<style>
</style>
