import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home模块的小仓库
const state = {
  // state中数据的默认初始值 根据接口的返回值初始化
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  // mutations是唯一修改state的地方
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.splice(0, 15);
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  //通过API里面的接口函数的调用 向服务器发请求 获取服务器数据
  async getCategoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("GETCATEGORYLIST", result.data);
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  // 获取floor轮播图的数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
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
