import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // reqGetSearchInfo函数调用服务器时 至少传递一个参数（空对象）
    // params是当用户派发action时 第二个参数传递过来的 至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// 计算属性：在项目中是为了简化仓库中的数据
// 可以把组件中需要用的数据简化 方便组件获取
const getters = {
  // state：当前仓库中的state
  goodsList(state) {
    // 假如网络不好 state.searchList.goodsList 应该返回的是undefined
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
