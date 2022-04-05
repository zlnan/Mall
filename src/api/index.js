//API接口进行统一管理
// 引入二次封装的axios （带有参数、响应的拦截器）
import { get, method } from "lodash";
import requests from "./ajax";
import mockRequests from "./mockAjax";

// 三级联动接口
// 请求地址：/api/product/getBaseCategoryList  get   无参数

// 发请求 axios发请求返回的结果是promise对象
// 对外暴露一个函数 只要外部调用这个函数 就向服务器发起ajax请求、获取数据 当前只需要把服务器返回的结果返回
//
export const reqCategoryList = () =>
  requests.get(`/product/getBaseCategoryList`);
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner （home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get(`/banner`);

// 获取floor数据
export const reqFloorList = () => mockRequests.get(`/floor`);

// 获取搜索模块数据 地址：/api/list 方式：POST  参数：需要带参
// 当前函数需要传递参数
// 当前接口给服务器传递的参数params 至少是一个空对象
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 获取产品详情信息的接口  地址：/api/item/{ skuId }  参数：GET
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 将产品添加到购物车 获取更新某一个产品的个数  /api/cart/addToCart/{ skuId }/{ skuNum }    post
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车列表数据  /api/cart/cartList   get
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 删除购物车商品   /api/cart/deleteCart/{skuId}   delete
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 修改商品选中状态   /api/cart/checkCart/{skuId}/{isChecked}  get
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取验证码   /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 用户注册    /api/user/passport/register   post    phone, password, code
export const reqUserRegister = (data) =>
  requests({ url: `/user/passport/register`, method: "post", data });

// 登录    /api/user/passport/login   post    phone  password
export const reqUserLogin = (data) =>
  requests({ url: `/user/passport/login`, method: "post", data });

// 获取用户信息  需要带着token向服务器要信息   /api/user/passport/auth/getUserInfo    get
export const reqUserInfo = () =>
  requests({ url: `/user/passport/auth/getUserInfo`, method: "get" });

// 退出登录    /api/user/passport/logout    get
export const reqUserLogout = () =>
  requests({ url: `/user/passport/logout`, method: "get" });

// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

// 获取商品清单    /api/order/auth/trade  get
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 提交订单    /api/order/auth/submitOrder?tradeNo={tradeNo}    post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

// 获取支付信息   /api/payment/weixin/createNative/{orderId}   get
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });

// 获取订单支付状态   /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

// 获取我的订单信息   /api/order/auth/{page}/{limit}     get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
