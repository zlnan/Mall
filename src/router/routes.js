// 路由配置信息

// 引入路由组件
// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// 引入二级路由组件
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/

// 路由配置信息
export default [
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: {
      show: false,
    },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder"),
      },
      // 重定向
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: {
      show: false,
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: {
      show: false,
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 判断从交易页面来 可以跳转
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: {
      show: false,
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 判断从购物车来 可以跳转
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: {
      show: false,
    },
  },
  {
    path: "/addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: {
      show: false,
    },
    name: "addcartsuccess",
  },
  {
    path: "/detail/:skuid",
    component: () => import("@/pages/Detail"),
    meta: {
      show: false,
    },
  },
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: {
      show: true,
    },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: {
      show: true,
    },
    name: "search",
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: {
      show: false,
    },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: {
      show: false,
    },
  },

  // 重定向，默认访问定向首页
  {
    path: "*",
    redirect: "/home",
  },
];
