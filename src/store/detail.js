import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装游客临时身份模块 生成应一个随机随机字符串
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  // 获取产品信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  // 将产品添加到购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      //返回的是成功的标记
      return "ok";
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("faile"));
    }
  },
};
// 简化数据
const getters = {
  categoryView(state) {
    // 比如 state、goodInfo初始状态都是空对象 空对象的categoryView属性值为undefined
    // 当前计算出的categoryView属性值至少是一个空对象 假的报错就没了
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
