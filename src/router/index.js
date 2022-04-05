import Vue from "vue";
import VueRooter from "vue-router";
import routes from "./routes";
// 使用插件
Vue.use(VueRooter);

// 引入store
import store from "@/store";

// 先把VueRouter原型对象的push replace 先保存一份
let originPush = VueRooter.prototype.push;
let originReplace = VueRooter.prototype.replace;

//重写push|replace方法
// 第一个参数：告诉原来的push方法 往哪跳转（传递哪些参数
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRooter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call|apple
    //相同点 都可以调用函数 篡改函数的上下文一次
    //不同点 call与apple传递参数：call传递参数用逗号隔开 apple方法执行 传递参数
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRooter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router = new VueRooter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

// 全局前置守卫   在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
  // to 跳转到哪个路由
  // from 从哪个路由跳转来
  // next 放行函数
  // next();

  // 用户登录了才有token
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.userInfo.name;
  // 如果登录了
  if (token) {
    // 不能去login
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      // 登录了 但是去的不是login
      // 如果用户名已有 有用户信息
      if (name) {
        next();
      } else {
        // 没有用户信息
        // 获取用户信息在首页展示 派发action让仓库存储信息再跳转
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token过期了 失效了 获取不到用户信息 重新登录
          // 清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 未登录不能去交易相关 支付相关 个人中心的路由
    // 未登录进入这些路由 跳转login
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
