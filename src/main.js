import Vue from "vue";
import App from "./App.vue";

// 引入路由
import router from "@/router";
// 引入仓库
import store from "./store";

Vue.config.productionTip = false;

// 定义全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button, MessageBox } from "element-ui";
// 注册全局组件：第一个参数全局组件名字 第二个参数哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
// Element-ui注册时 还有一种写法  挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入MockServe.js ----mock数据
import "@/mock/mockServe";
// 引入swiper样式
import "swiper/css/swiper.css";

// 统一接收api文件夹里面全部的请求函数
// 统一引入
import * as API from "@/api";

import atm from "./assets/1.gif";
// 引入插件
import VueLazyload from "vue-lazyload";
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
});
// 引入表单校验插件
import "@/plugins/validate";

// // 引入自定义插件
// import myPlugins from "./plugins/myPlugins";
// Vue.use(myPlugins, {
//   name: "zz",
// });

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库 组件实例的身上会多了一个属性 $store属性
  store,
}).$mount("#app");
