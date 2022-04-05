//二次封装axios
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 在当前模块引入store
import store from "@/store";

// 引入进度条样式
import "nprogress/nprogress.css";
//start方法 进度条开始 done 进度条结束

// 利用axios对象的create 去创建一个axios实例
// request就是axios
const requests = axios.create({
  // 配置对象
  //   基础路径 发送请求时 路径中默认加上/api
  baseURL: "/api",
  //   请求超时时间5s
  timeout: 5000,
});
// 请求拦截器：在发请求之前 可以检测到 在请求发出去之前进行操作
requests.interceptors.request.use((config) => {
  // config:配置对象 对象里面有一个属性很重要 headers请求头
  //   进度条开始动
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段userTempId  后台商量好的  不能随便定
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 需要携带token给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    //   成功的回调函数：服务器响应数据回来以后 可以检测到 进行操作
    //   进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    //   失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);

// 对外暴露
export default requests;
