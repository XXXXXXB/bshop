<template>
    <div class="main">

        <as-header></as-header>

        <div class="signin-form" style="margin-top: 70px;">
            <div class="signin-field">
                <img class="field-icon" src="/static/image/ind-username.png" />
                <input v-model="mobile" class="field-input" placeholder="请输入用户名/邮箱/手机号" />
            </div>
            <div class="signin-hline"></div>
            <div class="signin-field">
                <img class="field-icon" src="/static/image/ind-password.png" />
                <input v-model="password" type="password" class="field-input" placeholder="请输入密码" />
            </div>
        </div>
        <div class="signin-submit" @click="login">登录</div>
        <div class="signin-other">
            <router-link to="/user-register">
                <div class="other-item abs-left">快速注册</div>
            </router-link>
            <div class="other-item abs-right">忘记密码?</div>
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
            goods_id: 0,
            mobile: '',
            password: '',
        }
    },
    created: function () {
        let that = this;
        that.goods_id = that.$route.params.id;
    },
    methods: {
        login: function () {
            let that = this;
            Tools.requestPost(
                '/user/login',
                {
                    mobile: that.mobile,
                    password: that.password,
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
    }
}
</script>

<style>
</style>
