// 登录与注册
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqUserLogout,
} from "@/api";
import { getToken, setToken, removeToken } from "@/utils/token";

const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  // 获取验证码
  GETCODE(state, code) {
    state.code = code;
  },
  // 用户登录
  USERLOGIN(state, token) {
    state.token = token;
  },
  // 获取用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 退出登录 清除本地数据
  CLEAR(state) {
    // 将仓库中相关数据清空
    state.token = "";
    state.userInfo = {};
    // 将本地存储中数据清空
    removeToken();
  },
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //   用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    // 只是向服务器发请求 通知服务器清除token
    let result = await reqUserLogout();
    // action里不能操作state 提交mutation修改state
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
