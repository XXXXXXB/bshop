<template>
    <footer class="footer">
        <ul>
            <li>
                <router-link to="/index">
                    <img src="/static/images/tab-home-active.png" alt="">
                    <br>
                    <span class="active">首页</span>
                </router-link>
            </li>
            <li>
                <router-link to="/user-center">
                    <img src="/static/images/tab-my.png" alt="">
                    <br>
                    <span>我的</span>
                </router-link>
            </li>
        </ul>
    </footer>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
