<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在home、search中显示 login、register中隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // APP中的mounted只会执行一次  如果放在TypeNav中会多次执行请求
    // 通知Vuex发请求 获取三级列表的数据 存储于仓库中
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style></style>
