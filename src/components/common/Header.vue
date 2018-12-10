<template>
    <div>
        <mt-header :title="!!headtitle && headtitle !== '' ? headtitle : '广茂积分商城'" fixed>
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
            <mt-button v-if="headtitle!='地址编辑'" icon="more" slot="right"></mt-button>
            <mt-button v-else  slot="right">删除</mt-button>
        </mt-header>
        <div style="width: 100%; height: 0; margin-top:40px;"></div>
    </div>
</template>

<script>
    export default {
        name   : 'HelloWorld',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted:function(){
            
        },

        props  : ['headtitle'],
        methods: {
            goBack: function () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
</style>
